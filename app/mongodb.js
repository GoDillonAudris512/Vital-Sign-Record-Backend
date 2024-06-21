const mongoose = require('mongoose')
const connectionString = process.env.MONGO_CONNECTION_STRING
const dbName = process.env.MONGO_DB_NAME

module.exports = {
    // Connect to MongoDB
    async connect() {
        await mongoose
            .connect(`${connectionString}/${dbName}`)
            .catch(console.warn)

        const db = mongoose.connection

        if (db) {
            console.log("Successfully connected to MongoDB")
        }
        else {
            console.warn("Error connecting to database")
        }
    }
}