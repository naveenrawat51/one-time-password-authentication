const twilio = require('twilio');
const twilioCreds = require('./twilioCreds');

const accountSid = twilioCreds.accountSid;
const authToken = twilioCreds.authToken;

module.exports = new twilio.Twilio(accountSid, authToken);
