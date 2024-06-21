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
    
    async setupDatabase() {
        let db = this.dbConfig
        await db.connect().catch(console.warn)
    }

    setupServer() {
        // Register services to app
        this.express.use(cors())
        this.express.use(morgan('dev'))
        this.express.use(express.json())

        // Register hello api (for web availability checking)
        this.express.use('/api', require('../components/general/hello-api'))
    }

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