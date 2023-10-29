const httpProxy = require('express-http-proxy')
const logger = require('morgan')
const express = require('express')

const app = express() 
app.use(logger('dev'))

function selectProxyHost(req) {
    const path = req.path

    if (path.startsWith('/users')) {
        return 'http://localhost:8080/'
    } else if (path.startsWith('/transactions')) {
        return 'http://localhost:8002/'
    } else if (path.endsWith('/lock') || path.endsWith('/unlock')) {
        return 'http://localhost:8008/'
    } else if (path.startsWith('/scooters')) {
        return 'http://localhost:8001/'
    } else if (path.startsWith('/rentals')) {
        return 'http://localhost:8003/'
    }

    return null
}

app.use((req, res, next) => {
    const proxyHost = selectProxyHost(req)
    if (!proxyHost) {
        return res.status(404).send('Not found')
    }
    const handler = httpProxy(proxyHost)
    handler(req, res, next)
})

const port = 8000
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})