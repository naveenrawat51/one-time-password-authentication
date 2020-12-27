/* eslint-disable promise/no-nesting */
const admin = require('firebase-admin');

module.exports = function (request, response) {
    if (!request.body.phone || !request.body.code) {
        return response
            .status(422)
            .send({ error: 'You must provide phone and code' });
    }

    const phone = String(request.body.phone).replace(/[^\d]/g, '');
    const code = parseInt(request.body.code);

    admin
        .auth()
        .getUser(phone)
        .then(() => {
            const ref = admin.database().ref(`users/${phone}`);
            return ref.on('value', (snapshot) => {
                ref.off();
                const user = snapshot.val();

                if (user.code !== code || !user.codeValid) {
                    return response
                        .status(422)
                        .send({
                            error: `saved code: ${user.code}, code: ${code}, codevalid: ${user.codeValid}Code not Valid`,
                        });
                }

                ref.update({ codeValid: false });
                admin
                    .auth()
                    .createCustomToken(phone)
                    .then((token) => response.send({ token: token }))
                    .catch((err) => response.send(err));
            });
        })
        .catch((err) => response.status(422).send(err));
};
