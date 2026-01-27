const mongoose = require('mongoose');

let mongoUrl;
const connect = async() => {
    try {
        const user = process.env.MONGODB_USERNAME;
        const pass = process.env.MONGODB_PASSWORD;
        const conn = await mongoose.connect(process.env.MONGODB_URL, {user: user, pass: pass, tls: true, tlsAllowInvalidCertificates: process.env.ALLOW_INVALID_CERTS, tlsCAFile: process.env.CA_FILE_PATH});
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) { 
        console.error(`Error: ${err.message}`)
    }
};

const dbConnection = mongoose.connection;

const disconnect = () => {
    dbConnection.removeAllListeners();
    return db.disconnect();
};

module.exports = {
    connect,
    disconnect,
}