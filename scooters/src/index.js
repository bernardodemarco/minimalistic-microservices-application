const { PrismaClient } = require('@prisma/client')
const express = require('express')

const prisma = new PrismaClient()
const app = express()

const checkScooterStatus = require('./utils/check-scooter-status')
const generateRandomCoordinates = require('./utils/generate-random-coordinates')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.post('/scooters', async (req, res) => {
    const { status, latitude, longitude } = req.body

    if (!checkScooterStatus(status)) {
        return res.status(400).send('Invalid scooter status')
    }

    try {
        await prisma.$executeRaw`
            INSERT INTO Scooters
            (status, latitude, longitude)
            VALUES (${status}, ${latitude}, ${longitude})
        `

        return res.status(201).send('Scooter create successfully')
    } catch (err) {
        console.log(err)
        return res.status(500).send('Unable to create scooter')
    }
})

app.get('/scooters', async (req, res) => {
    const scooters = await prisma.$queryRaw`
        SELECT *
        FROM Scooters
    `

    return res.status(200).json(scooters)
})

app.get('/scooters/available', async (req, res) => {
    const scooters = await prisma.$queryRaw`
        SELECT *
        FROM Scooters
        WHERE status = 'available'
    `

    const noScootersAvailable = scooters.length === 0
    if (noScootersAvailable) {
        return res.status(404).send('No scooters are available')
    }

    return res.status(200).json(scooters)
})

app.get('/scooters/:id', async (req, res) => {
    const { id } = req.params

    const response = await prisma.$queryRaw`
        SELECT *
        FROM Scooters
        WHERE id = ${id}
    `
    const scooterNotFound = response.length === 0
    if (scooterNotFound) {
        return res.status(404).send('Scooter not found')
    }

    const scooter = response[0]
    return res.status(200).json(scooter)
})

app.put('/scooters/:id', async (req, res) => {
    const { id } = req.params
    const { status, latitude, longitude } = req.body

    if (!checkScooterStatus(status)) {
        return res.status(400).send('Invalid scooter status')
    }

    try {
        const response = await prisma.$executeRaw`
            UPDATE Scooters
            SET status    = COALESCE(${status}, status),
                latitude  = COALESCE(${latitude}, latitude),
                longitude = COALESCE(${longitude}, longitude)
            WHERE id = ${id}
        `

        const scooterNotFound = response === 0
        if (scooterNotFound) {
            return res.status(404).send('Scooter not found')
        }

        return res.status(200).send('Scooter updated successfully')
    } catch (err) {
        console.log(err)
        return res.status(500).send('Unable to update scooter')
    }
})

app.delete('/scooters/:id', async (req, res) => {
    const { id } = req.params

    try {
        const response = await prisma.$executeRaw`
            DELETE FROM Scooters
            WHERE id = ${id}
        `

        const scooterNotFound = response === 0
        if (scooterNotFound) {
            return res.status(404).send('Scooter not found')
        }

        return res.status(200).send('Scooter deleted successfully')
    } catch (err) {
        console.log(err)
        return res.status(500).send('Unable to delete scooter')
    }
})

async function updateScooterCoordinatesPeriodically() {
    try {
        const scooters = await prisma.$queryRaw`
            SELECT *
            FROM Scooters
        `;

        scooters.forEach(async (scooter) => {
            const { latitude, longitude } = generateRandomCoordinates()
            await prisma.$executeRaw`
                UPDATE Scooters
                SET latitude  = ${latitude},
                    longitude = ${longitude}
                WHERE id = ${scooter.id}
            `
        })
    } catch (err) {
        console.error('Error during periodic update:', err);
    }
}

const updateCoordinatesInterval = 1 * 60 * 1000
setInterval(updateScooterCoordinatesPeriodically, updateCoordinatesInterval)

port = 8001
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
