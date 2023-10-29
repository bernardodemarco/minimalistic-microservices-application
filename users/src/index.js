const { PrismaClient } = require('@prisma/client')
const express = require('express')

const prisma = new PrismaClient()
const app = express()

app.use(express.urlencoded({ extended: true }))

app.post('/users', async (req, res) => {
    const { cpf, name, email, phoneNumber } = req.body

    try {
        await prisma.$executeRaw`
            INSERT INTO Users
            (cpf, name, email, phone_number)
            VALUES (${cpf}, ${name}, ${email}, ${phoneNumber})
        `
        return res.status(201).send('User created successfully')
    } catch (err) {
        return res.status(500).send('Unable to create user')
    }
})

app.get('/users', async (req, res) => {
    const users = await prisma.$queryRaw`
        SELECT *
        FROM Users
    `
    return res.status(200).json(users)
})

app.get('/users/:cpf', async (req, res) => {
    const { cpf } = req.params

    const response = await prisma.$queryRaw`
        SELECT *
        FROM Users
        WHERE cpf = ${cpf}
    `

    const userNotFound = response.length === 0
    if (userNotFound) {
        return res.status(404).send('User not found')
    }

    const user = response[0]
    return res.status(200).json(user)
})

app.put('/users/:cpf', async (req, res) => {
    const { cpf } = req.params
    const { name, email, phoneNumber } = req.body

    try {
        const response = await prisma.$executeRaw`
            UPDATE Users
            SET name         = COALESCE(${name}, name),
                email        = COALESCE(${email}, email),
                phone_number = COALESCE(${phoneNumber}, phone_number)
            WHERE cpf = ${cpf}
        `

        const userNotFound = response === 0
        if (userNotFound) {
            return res.status(404).send('User not found')
        }

        return res.status(200).send('User updated successfully')
    } catch (err) {
        console.log(err)
        return res.status(500).send('Unable to update user')
    }
})

app.delete('/users/:cpf', async (req, res) => {
    const { cpf } = req.params
    
    try {
        const response = await prisma.$executeRaw`
            DELETE FROM Users
            WHERE cpf = ${cpf}
        `

        const userNotFound = response === 0
        if (userNotFound) {
            return res.status(404).send('User not found')
        }

        return res.status(200).send('User deleted successfully')
    } catch (err) {
        return res.json(500).send('Unable to delete user')
    }
})

port = 8080
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})