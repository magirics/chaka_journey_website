import Stripe from 'stripe';
import payload from 'payload';
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

    // 3️⃣ Crear la reserva en Payload
    const reserva = await payload.create({
      collection: 'reservas',
      data: {
        stripeSessionId: sessionId,
        customerEmail: checkoutSession.customer_details.email,
        amount: checkoutSession.amount_total / 100,
        status: 'paid',
        items: checkoutSession.line_items?.data?.map(item => ({
          description: item.description,
          quantity: item.quantity,
        })) || [],
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
      from:    `"Chaka Journey" <${process.env.SMTP_USER}>`,
      to:       customerEmail,
      subject: '✅ Confirmación de tu reserva',
      html:    `<p>Pago recibido: $${amount}</p><p>Código: ${reserva.id}</p>`,
    });
    console.log(`📧 Correo enviado a ${customerEmail}`);

 
  } catch (error) {
    console.error('🔥 Fulfillment error:', error);
    throw error;
  }
}
