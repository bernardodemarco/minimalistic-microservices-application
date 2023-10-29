const { PrismaClient } = require('@prisma/client')
const express = require('express')

const prisma = new PrismaClient()
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.json())

app.post('/transactions', async (req, res) => {
    const { cardNumber } = req.body

    if (!cardNumber) {
        return res.status(400).send('Invalid card number')
    }

    try {
        const { id } = await prisma.transactions.create({
            data: {
                'card_number': cardNumber
            }
        })

        return res.status(201).json({ id })
    } catch (err) {
        console.log(err)
        return res.status(500).send('Unable to create transaction')
    }
})

app.put('/transactions/:id/charge', async (req, res) => {
    const { id } = req.params

    try {
        const response = await prisma.$executeRaw`
            UPDATE Transactions
            SET charged = true
            WHERE id = ${id}
        `

        const cardNotFound = response === 0
        if (cardNotFound) {
            return res.status(404).send('Card not found')
        }

        return res.status(200).send('Card charged successfully')
    } catch (err) {
        console.log(err)
        return res.status(500).send('Unable to charge the card')
    }
})

app.get('/transactions', async (req, res) => {
    const transactions = await prisma.$queryRaw`
        SELECT *
        FROM Transactions
    `

    return res.status(200).json(transactions)
})

port = 8002
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
