const admin = require('firebase-admin');
const twilio = require('./twilio');

module.exports = async function (request, response) {
    if (!request.body.phone) {
        return response
            .status(422)
            .send({ error: 'You must provide a phone number' });
    }

    const phone = String(request.body.phone).replace(/[^\d]/g, '');
    try {
        await admin.auth().getUser(phone);
        const code = Math.floor(Math.random() * 8999 + 1000);
        await twilio.messages.create({
            body: `Your code is ${code}`,
            to: `+91${phone}`,
            from: '+12058591721',
        });
        admin
            .database()
            .ref(`users/${phone}`)
            .update({ code: code, codeValid: true }, () => {
                response.send({ success: true });
            })
            .then((data) => response.send(err))
            .catch((err) => response.send(err));
    } catch (error) {
        response.status(422).send(error);
    }
};
