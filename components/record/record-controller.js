const Record = require('./record-model')

module.exports = {
    // Function to add new vital sign record to database
    async create(req, res) {
        try {
            // Get request body
            const { email, time, bloodPressure, heartbeat, respiratoryRate, temperature } = req.body

            // Create new record
            const newRecord = new Record({
                email: email, 
                time: new Date(time),
                bloodPressure: {
                    systolic: bloodPressure.systolic,
                    diastolic: bloodPressure.diastolic
                },
                heartbeat: heartbeat,
                respiratoryRate: respiratoryRate,
                temperature: temperature
            })
            await newRecord.save()

            // Send back OK response
            res.status(200).json({
                message: "Record created successfully!"
            })
        }
        catch (err) {
            res.status(500).json({
                message: `Error creating record: ${err}`
            })
        }
    },

    // Function to get all user vital sign records in database
    async findAll(req, res) {
        try {
            // Get request body
            const { email } = req.body

            // Get records associated with that email
            const records = await Record.find({ email: email})
                .lean()
                .select({ _id: 0, __v: 0 , bloodPressure: {_id: 0}});

            // Send back OK response
            res.status(200).json({
                records: records
            })
        }
        catch (err) {
            res.status(500).json({
                message: `Error creating record: ${err}`
            })
        }
    }
}