const axios = require('axios').default
const express = require('express')

const app = express()

app.use(express.urlencoded({ extended: true }))

app.put('/scooters/:id/lock', async (req, res) => {
    const { id } = req.params

    if (!id) {
        return res.status(400).send('Invalid scooter ID')
    }

    try {
        const response = await axios.put(`http://localhost:8001/scooters/${id}`, {
            status: 'rented'
        })

        if (response.status !== 200) {
            return res.status(response.status).send(response.data)
        }

        return res.status(200).send('Scooter was locked successfully')
    } catch (err) {
        console.log(err.request)
        return res.status(500).send('Unable to unlock the scooter')
    }
})

app.put('/scooters/:id/unlock', async (req, res) => {
    const { id } = req.params

    if (!id) {
        return res.status(400).send('Invalid scooter ID')
    }

    try {
        const response = await axios.put(`http://localhost:8001/scooters/${id}`, {
            status: 'available'
        })

        if (response.status !== 200) {
            return res.status(response.status).send(response.data)
        }

        return res.status(200).send('Scooter was unlocked successfully')
    } catch (err) {
        console.log(err.request)
        return res.status(500).send('Unable to unlock the scooter')
    }
})

port = 8008
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
