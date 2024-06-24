const Record = require('./record-model')

module.exports = {
    // Function to add new vital sign record to database
    async create(req, res) {
        try {
            // Get request body
            const { email, time, bloodPressure, heartbeat, respiratoryRate, temperature } = req.body

            // Check existing record
            const existingRecord = await Record.findOne({ email: email, time: new Date(time)})
            if (existingRecord) {
                return res.status(422).json({
                    message: "Record already exist!"
                })
            }
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
    },

    // Function to update vital sign record to database
    async update(req, res) {
        try {
            // Get request body
            const { email, time, bloodPressure, heartbeat, respiratoryRate, temperature } = req.body

            // Check existing record
            const existingRecord = await Record.findOne({ email: email, time: new Date(time)})
            if (!existingRecord) {
                return res.status(400).json({
                    message: "Record does not exist!"
                })
            }

            // Update record
            const newRecordData = {
                email: email, 
                time: new Date(time),
                bloodPressure: {
                    systolic: bloodPressure.systolic,
                    diastolic: bloodPressure.diastolic
                },
                heartbeat: heartbeat,
                respiratoryRate: respiratoryRate,
                temperature: temperature
            }
            await Record.findByIdAndUpdate(existingRecord._id, newRecordData)

            // Send back OK response
            res.status(200).json({
                message: "Record updated successfully!"
            })
        }
        catch (err) {
            res.status(500).json({
                message: `Error updating record: ${err}`
            })
        }
    },

    // Delete vital sign record with matching email and time
    async delete(req, res) {
        try {
            // Get request body
            const { email, time } = req.body

            // Get matching record
            const existingRecord = await Record.findOne({ email: email, time: new Date(time)})
            if (!existingRecord) {
                return res.status(400).json({
                    message: "Record does not exist!"
                })
            }

            // Delete record
            await Record.findByIdAndDelete(existingRecord._id)

            // Send back OK response
            res.status(200).json({
                message: "Record deleted successfully!"
            })
        }
        catch (err) {
            res.status(500).json({
                message: `Error deleting record: ${err}`
            })
        }
    }
}