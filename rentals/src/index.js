const axios = require('axios').default
const { PrismaClient } = require('@prisma/client')
const express = require('express')

const prisma = new PrismaClient()
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.post('/rentals/:scooterId', async (req, res) => {
    const { scooterId } = req.params
    const { rentalAmount } = req.body

    try {
        await axios.put(`http://localhost:8008/scooters/${scooterId}/lock`)
        
        await prisma.$executeRaw`
            INSERT INTO rentals
            (rental_amount)
            VALUES (${rentalAmount})
        `

        return res.status(201).send('Rental created successfully')
    } catch (err) {
        console.log(err)
        return res.status(500).send('Unable to create rental')
    }
})

app.put('/rentals/:id/scooters/:scooterId/end', async (req, res) => {
    const { id, scooterId } = req.params

    try {
        await axios.put(`http://localhost:8008/scooters/${scooterId}/unlock`)

        const response = await prisma.$executeRaw`
            UPDATE Rentals
            SET end_time = ${Date.now()}
            WHERE id = ${id}
        `

        const rentalIdNotFound = response === 0
        if (rentalIdNotFound) {
            return res.status(404).send('Rental not found')
        }

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
