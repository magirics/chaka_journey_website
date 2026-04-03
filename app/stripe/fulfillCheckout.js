import Stripe from 'stripe';
import payload from 'payload';
import nodemailer from 'nodemailer';
//import config from '@/payload.config'; 

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function fulfillCheckout(sessionId) {
  console.log('🔔 Fulfillment iniciado para sessionId:', sessionId);

  try {
    // 1️⃣ Recuperar la sesión de Stripe
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
    const amount = checkoutSession.amount_total / 100;

    // Intentar leer metadata enviada desde create-checkout-session
    const masterId = checkoutSession.metadata?.masterId || null;
    const startDate = checkoutSession.metadata?.startDate || null;
    const endDate = checkoutSession.metadata?.endDate || null;

    console.log('FulfillCheckout: metadata masterId, startDate, endDate:', masterId, startDate, endDate);

    // Validación: si la lógica requiere master y fechas, abortamos si no están
    if (!masterId || !startDate || !endDate) {
      console.warn('FulfillCheckout: falta masterId/startDate/endDate en metadata; no se creará la reserva.');
      return;
    }

// 3️⃣ Crear la reserva en Payload
    console.log('FulfillCheckout: creando reserva en Payload con:', {
      stripeSessionId: sessionId,
      customerEmail,
      amount,
      masterId,
      startDate,
      endDate,
      items: checkoutSession.line_items?.data?.map(i => ({ desc: i.description, qty: i.quantity })) || [],
    });
const reserva = await payload.create({
  collection: 'reserves',
  data: {
    stripeSessionId: sessionId,
    customerEmail,
    amount,
    status: 'paid',
    items: checkoutSession.line_items?.data?.map(item => ({
      description: item.description,
      quantity: item.quantity,
    })) || [],
    ...(masterId ? { master: masterId } : {}),
    ...(startDate ? { startDate } : {}),
    ...(endDate ? { endDate } : {}),
  },
});

    console.log('✅ Reserva creada en Payload con ID:', reserva.id);
    
// 4️⃣ Enviar correo...
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
  subject: '✨ Confirmación de tu reserva - Chaka Journey',
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border-radius: 10px; background-color: #f9f9f9; border: 1px solid #eee;">
      <h2 style="color: #4CAF50; text-align: center;">✅ ¡Tu pago fue recibido!</h2>
      <p style="font-size: 16px; color: #333;">
        Hola <strong>${customerEmail}</strong>,<br><br>
        Gracias por confiar en <strong>Chaka Journey</strong>. Tu reserva ha sido confirmada con éxito.
      </p>
      
      <div style="background: #fff; padding: 15px; border-radius: 8px; border: 1px solid #ddd; margin: 20px 0;">
        <p style="margin: 5px 0; font-size: 15px;"><strong>Monto:</strong> $${amount}</p>
        <p style="margin: 5px 0; font-size: 15px;"><strong>Código de reserva:</strong> ${reserva.id}</p>
        <p style="margin: 5px 0; font-size: 15px;"><strong>Estado:</strong> ${reserva.status}</p>
      </div>
      
      <p style="font-size: 15px; color: #555;">
        Nos pondremos en contacto contigo con más detalles muy pronto.<br>
        Mientras tanto, puedes comunicarte con nosotros si tienes alguna consulta.
      </p>
      
      <div style="text-align: center; margin-top: 20px;">
        <a href="https://chaka.com" style="background-color: #4CAF50; color: white; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-size: 16px; display: inline-block;">
          Ver tu reserva
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
