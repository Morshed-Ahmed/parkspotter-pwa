require('dotenv').config();
const stripe = require('stripe')("sk_test_51PGS16GjULo50m7ShgrVG06NiW8Gj30PreTgxpiJAHXyn14CwCd93Shm3huJsjLvDmMhunqgmFwpVjq70bUiQYLA00awRGXdFt");

exports.handler = async (event, context) => {
  const { paymentMethodId, amount, currency } = JSON.parse(event.body);

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method: paymentMethodId,
      confirmation_method: 'manual',
      confirm: true,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
