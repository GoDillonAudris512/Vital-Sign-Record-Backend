const mongoose = require('mongoose')

const Schema = mongoose.Schema

// Blood pressure, consist of systolic and diastolic pressure
const bloodPressureSchema = new Schema({
    systolic: {
        type: Number,
        required: true
    },
    diastolic: {
        type: Number,
        required: true
    }
})

// Record will hold user email, record time, and all 4 vital sign measurement
const recordSchema = new Schema({
    email: {
        type: String, 
        required: true
    },
    time: {
        type: Date,
        required: true
    },
    bloodPressure: bloodPressureSchema,
    heartbeat: {
        type: Number,
        required: true
    },
    respiratoryRate: {
        type: Number,
        required: true
    },
    temperature: {
        type: Number,
        required: true
    }
})

const Record = mongoose.model('Record', recordSchema)

module.exports = Record