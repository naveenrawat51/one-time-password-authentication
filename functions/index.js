const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
const functions = require('firebase-functions');
const createUser = require('./create_user');
const requestOneTimePassword = require('./request_one_time_password');
const verifyOneTimePassword = require('./verify_one_time_password');
// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
// });

admin.initializeApp(functions.config().firebase);

exports.createUser = functions.https.onRequest(createUser);
exports.requestOneTimePassword = functions.https.onRequest(
    requestOneTimePassword
);
exports.verifyOneTimePassword = functions.https.onRequest(
    verifyOneTimePassword
);
