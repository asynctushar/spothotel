const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.retrivePaymentIndent = async (paymentInfo) => {
    const intent = await stripe.paymentIntents.retrieve(paymentInfo.id);

    return intent;
};

exports.createPaymentIntent = async (data = {}) => {
    const paymentInfo = await stripe.paymentIntents.create(data);

    return paymentInfo;
};