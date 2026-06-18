import Stripe from 'stripe';
import payload from 'payload';
import nodemailer from 'nodemailer';

function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not configured');
  }

  return new Stripe(process.env.STRIPE_SECRET_KEY);
}

function normalizeRelationshipId(value) {
  if (value === null || value === undefined) return null;
  if (typeof value === 'number') return String(value);
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (!trimmed) return null;
    return trimmed;
  }
  if (typeof value === 'object' && value?.value !== undefined) {
    return normalizeRelationshipId(value.value);
  }
  return value;
}

async function resolveCollectionDocId(collection, rawId) {
  const normalized = normalizeRelationshipId(rawId);
  if (!normalized) return null;

  const candidates = [normalized];
  if (typeof normalized === 'string' && /^\d+$/.test(normalized)) {
    candidates.push(Number(normalized));
  }

  for (const candidate of candidates) {
    try {
      const doc = await payload.findByID({
        collection,
        id: candidate,
      });
      if (doc?.id !== undefined && doc?.id !== null) {
        return doc.id;
      }
    } catch {
      
    }
  }

  return null;
}

function toRelationshipValue(id) {
  if (typeof id === 'string' && /^\d+$/.test(id)) {
    return Number(id);
  }

  return id;
}


export async function fulfillCheckout(sessionId) {
  console.log('🔔 Fulfillment iniciado para sessionId:', sessionId);

  try {
    // 1️⃣ Recuperar la sesión de Stripe
    const stripe = getStripe();
    const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items', 'customer_details'],
    });
    console.log('✅ Sesión recuperada:', checkoutSession.id);

    if (checkoutSession.payment_status !== 'paid') {
      console.log('⚠️ Sesión no está pagada, abortando fulfillment.');
      return;
    }

    // 2️⃣ Inicializar Payload si no está activo
    if (!payload.isInit) {
      console.log('🟢 Inicializando Payload...');
      await payload.init({
        secret: process.env.PAYLOAD_SECRET,
        local: true,
        config: (await import('../../payload.config')).default,
      });
    }

    // 🔹 Variables reutilizables
    const customerEmail = checkoutSession.customer_details?.email;
    const amount = (checkoutSession.amount_total || 0) / 100;
    const checkoutType = checkoutSession.metadata?.checkoutType === 'gift' ? 'gift' : 'reserve';

    if (!customerEmail) {
      console.warn('FulfillCheckout: no customer email found in Stripe session; aborting fulfillment.');
      return;
    }

    // Intentar leer metadata enviada desde create-checkout-session
    const masterId = checkoutSession.metadata?.masterId || null;
    const startDate = checkoutSession.metadata?.startDate || null;
    const endDate = checkoutSession.metadata?.endDate || null;
    const giftId = checkoutSession.metadata?.giftId || null;
    const giftType = checkoutSession.metadata?.giftType || 'physical';
    const recipientName = checkoutSession.metadata?.recipientName || '';
    const deliveryAddress = checkoutSession.metadata?.deliveryAddress || '';
    const giftNote = checkoutSession.metadata?.giftNote || '';
    const subtotalAmount = Number(checkoutSession.metadata?.subtotalAmount || amount);
    const deliveryFee = Number(checkoutSession.metadata?.deliveryFee || 0);

    console.log('FulfillCheckout: metadata', {
      checkoutType,
      masterId,
      startDate,
      endDate,
      giftId,
      giftType,
      recipientName,
      deliveryAddress,
      giftNote,
      subtotalAmount,
      deliveryFee,
    });

    // Resolve relationship IDs using Payload so we persist the exact ID type expected by DB schema.
    const resolvedMasterId = await resolveCollectionDocId('masters', masterId);
    if (masterId && !resolvedMasterId) {
      console.warn('FulfillCheckout: master not found with metadata masterId:', masterId);
    }

    // 3️⃣ Crear transacción de regalo
    let savedOrder;
    if (checkoutType === 'gift') {
      if (!giftId) {
        console.warn('FulfillCheckout: falta giftId en metadata; no se creará la orden de regalo.');
        return;
      }

      if (!recipientName) {
        console.warn('FulfillCheckout: falta recipientName en metadata; no se creará la orden de regalo.');
        return;
      }

      const resolvedGiftId = await resolveCollectionDocId('gifts', giftId);
      if (!resolvedGiftId) {
        console.warn('FulfillCheckout: gift not found with metadata giftId:', giftId);
        return;
      }

      const giftRelationship = toRelationshipValue(resolvedGiftId);
      const masterRelationship = toRelationshipValue(resolvedMasterId);

      savedOrder = await payload.create({
        collection: 'gift-orders',
        data: {
          gift: giftRelationship,
          ...(masterRelationship ? { master: masterRelationship } : {}),
          customerEmail,
          recipientName,
          ...(deliveryAddress ? { deliveryAddress } : {}),
          ...(giftNote ? { giftNote } : {}),
          giftType,
          stripeSessionId: sessionId,
          stripePaymentIntentId: checkoutSession.payment_intent?.toString() || '',
          subtotalAmount,
          deliveryFee,
          totalAmount: amount,
          currency: checkoutSession.currency || 'usd',
          status: 'paid',
        },
      });

      console.log('✅ Orden de regalo creada con ID:', savedOrder.id);
    } else {
      // Validación: si la lógica requiere master y fechas, abortamos si no están
      if (!masterId || !startDate || !endDate) {
        console.warn('FulfillCheckout: falta masterId/startDate/endDate en metadata; no se creará la reserva.');
        return;
      }

      // Idempotencia: evita crear una segunda reserva para la misma sesión de Stripe.
      const existingReserve = await payload.find({
        collection: 'reserves',
        where: {
          stripeSessionId: {
            equals: sessionId,
          },
        },
        limit: 1,
      });

      if (existingReserve.totalDocs > 0) {
        console.log('FulfillCheckout: reserva ya existente para esta sesión, omitiendo creación.', {
          sessionId,
          reserveId: existingReserve.docs[0]?.id,
        });
        return;
      }

      // 4️⃣ Crear la reserva en Payload
      console.log('FulfillCheckout: creando reserva en Payload con:', {
        stripeSessionId: sessionId,
        customerEmail,
        amount,
        masterId: resolvedMasterId,
        startDate,
        endDate,
      });

      savedOrder = await payload.create({
        collection: 'reserves',
        data: {
          stripeSessionId: sessionId,
          customerEmail,
          status: 'paid',
          ...(resolvedMasterId ? { masterRef: String(resolvedMasterId) } : {}),
          ...(startDate ? { startDate } : {}),
          ...(endDate ? { endDate } : {}),
        },
      });

      console.log('✅ Reserva creada en Payload con ID:', savedOrder.id);
    }

    // 5️⃣ Enviar correo...
    const transporter = nodemailer.createTransport({
      host:     process.env.SMTP_HOST,
      port:     Number(process.env.SMTP_PORT) || 587,
      secure:   process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Chaka Journey" <${process.env.SMTP_USER}>`,
      to: customerEmail,
      subject:
        checkoutType === 'gift'
          ? 'Tu regalo en Chaka ha sido confirmado'
          : 'Confirmacion de tu reserva - Chaka Journey',
      html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border-radius: 10px; background-color: #f9f9f9; border: 1px solid #eee;">
      <h2 style="color: #4CAF50; text-align: center;">✅ ¡Tu pago fue recibido!</h2>
      <p style="font-size: 16px; color: #333;">
        Hola <strong>${customerEmail}</strong>,<br><br>
        ${
          checkoutType === 'gift'
            ? 'Gracias por confiar en <strong>Chaka Journey</strong>. Tu regalo ha sido confirmado con exito.'
            : 'Gracias por confiar en <strong>Chaka Journey</strong>. Tu reserva ha sido confirmada con exito.'
        }
      </p>
      
      <div style="background: #fff; padding: 15px; border-radius: 8px; border: 1px solid #ddd; margin: 20px 0;">
        <p style="margin: 5px 0; font-size: 15px;"><strong>Monto:</strong> $${amount}</p>
        <p style="margin: 5px 0; font-size: 15px;"><strong>Codigo:</strong> ${savedOrder.id}</p>
        <p style="margin: 5px 0; font-size: 15px;"><strong>Estado:</strong> ${savedOrder.status}</p>
      </div>
      
      <p style="font-size: 15px; color: #555;">
        ${
          checkoutType === 'gift'
            ? 'Te contactaremos para confirmar la entrega y el mensaje personalizado del regalo.<br>Mientras tanto, puedes escribirnos si tienes alguna consulta.'
            : 'Nos pondremos en contacto contigo con mas detalles muy pronto.<br>Mientras tanto, puedes comunicarte con nosotros si tienes alguna consulta.'
        }
      </p>
      
      <div style="text-align: center; margin-top: 20px;">
        <a href="https://chaka.com" style="background-color: #4CAF50; color: white; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-size: 16px; display: inline-block;">
          Ver en Chaka
        </a>
      </div>
      
      <p style="margin-top: 30px; font-size: 13px; color: #aaa; text-align: center;">
        © 2025 Chaka Journey · Todos los derechos reservados
      </p>
    </div>
  `,
    });

    console.log(`📧 Correo enviado a ${customerEmail}`);

 
  } catch (error) {
    console.error('🔥 Fulfillment error:', error);
    throw error;
  }
}
