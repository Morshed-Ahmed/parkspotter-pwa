const axios = require('axios');

const BKASH_BASE_URL = "https://checkout.sandbox.bka.sh/v1.2.0-beta";
const BKASH_APP_KEY = "your_app_key";
const BKASH_APP_SECRET = "your_app_secret";
const BKASH_USERNAME = "your_username";
const BKASH_PASSWORD = "your_password";

const generateToken = async () => {
  try {
    const response = await axios.post(`${BKASH_BASE_URL}/token/grant`, {
      app_key: BKASH_APP_KEY,
      app_secret: BKASH_APP_SECRET,
    }, {
      auth: {
        username: BKASH_USERNAME,
        password: BKASH_PASSWORD,
      },
    });

    return response.data.id_token;
  } catch (error) {
    console.error('Error generating bKash token:', error);
    throw new Error('Unable to generate bKash token');
  }
};

exports.handler = async (event) => {
  try {
    const { amount } = JSON.parse(event.body);
    const token = await generateToken();

    const response = await axios.post(`${BKASH_BASE_URL}/checkout/payment/create`, {
      amount,
      currency: 'BDT',
      intent: 'sale',
    }, {
      headers: {
        Authorization: token,
        'X-APP-Key': BKASH_APP_KEY,
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        paymentID: response.data.paymentID,
        bkashURL: response.data.bkashURL,
      }),
    };
  } catch (error) {
    console.error('Error creating bKash payment:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error creating bKash payment' }),
    };
  }
};
