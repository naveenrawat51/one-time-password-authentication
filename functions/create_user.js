const admin = require('firebase-admin');

module.exports = async function (request, response) {
    // verify user sending phone number in body
    if (!request.body.phone) {
        return response.status(422).send({ err: 'Bad Input' });
    }

    // Format the phone number to remove dashes and parans
    const phone = String(request.body.phone).replace(/[^\d]/g, '');

    // create a new user account using service and phone number
    try {
        const user = await admin.auth().createUser({ uid: phone });
        response.send(user);
    } catch (error) {
        response.status(422).send(error);
    }

    return null;
};
