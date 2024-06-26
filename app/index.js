const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

// Class to manage everything about server
class Application {
    constructor() {
        this.express = express()
        this.serverConfig = require('./config/server')
        this.dbConfig = require('./config/database')
    }
    
    // Setup and connect to database
    async setupDatabase() {
        let db = this.dbConfig
        await db.connect().catch(console.warn)
    }

    // Setup server
    setupServer() {
        // Register services to app
        this.express.use(cors())
        this.express.use(morgan('dev'))
        this.express.use(express.json())

        // Register hello api (for web availability checking)
        this.express.use('/api', require('../components/general/hello-api'))

        // Register user api
        this.express.use('/api', require('../components/user/user-api'))

        // Register record api
        this.express.use('/api', require('../components/record/record-api'))
    }

    // Run server
    run() {
        this.express.listen(this.serverConfig.port, () => {
            this.setupDatabase().then(() => {
                this.setupServer()
                console.log(`Server listening on port ${this.serverConfig.port}`)
            })
        })
    }
}

module.exports = new Application()