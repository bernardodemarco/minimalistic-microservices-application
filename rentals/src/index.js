const axios = require('axios').default
const { PrismaClient } = require('@prisma/client')
const express = require('express')

const prisma = new PrismaClient()
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.post('/rentals/:scooterId', async (req, res) => {
    const { scooterId } = req.params
    const { rentalAmount, cardNumber } = req.body

    try {
        await axios.put(`http://localhost:8008/scooters/${scooterId}/lock`)

        const { data: { id: transactionId } } = await axios.post(`http://localhost:8002/transactions`, {
            cardNumber
        })

        await prisma.$executeRaw`
            INSERT INTO Rentals
            (rental_amount, scooter_id, transaction_id)
            VALUES (${rentalAmount}, ${scooterId}, ${transactionId})
        `

        return res.status(201).send('Rental created successfully')
    } catch (err) {
        let errorMessage = err?.response?.data
        if (!errorMessage) {
            errorMessage = 'Unable to create rental'
        }
        return res.status(500).send(errorMessage)
    }
})

app.put('/rentals/:id/end', async (req, res) => {
    const { id } = req.params

    try {
        const rental = await prisma.$queryRaw`
            SELECT scooter_id, transaction_id
            FROM Rentals
            WHERE id = ${id}
        `
        if (rental.length === 0) {
            return res.status(404).send(`Rental not found`)
        }

        const {
            scooter_id: scooterId,
            transaction_id: transactionId
        } = rental[0]

        await axios.put(`http://localhost:8008/scooters/${scooterId}/unlock`)

        await axios.put(`http://localhost:8002/transactions/${transactionId}/charge`)

        await prisma.$executeRaw`
            UPDATE Rentals
            SET end_time = ${Date.now()}
            WHERE id = ${id}
        `

        return res.status(200).send('Rental ended successfully')
    } catch (err) {
        console.log(err)
        return res.status(200).send('Unable to end rental')
    }
})

app.get('/rentals', async (req, res) => {
    const rentals = await prisma.$queryRaw`
        SELECT *
        FROM Rentals
    `

    return res.status(200).json(rentals)
})


port = 8003
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
