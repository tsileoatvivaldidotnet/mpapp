const mongoose = require('mongoose');

let mongoUrl;
const connect = async() => {
    try {
      const conn = await mongoose.connect(process.env.MONGODB_URL);
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