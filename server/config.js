require('dotenv').config();

let { APS_CLIENT_ID, APS_CLIENT_SECRET, PORT } = process.env;
if (!APS_CLIENT_ID || !APS_CLIENT_SECRET) {
    console.warn('Missing some of the environment variables.');
    process.exit(1);
}

PORT = PORT || 3001;

module.exports = {
    APS_CLIENT_ID,
    APS_CLIENT_SECRET,
    PORT
};