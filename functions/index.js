const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
const functions = require('firebase-functions');
const createUser = require('./create_user');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

exports.createUser = functions.https.onRequest(createUser);
