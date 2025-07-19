import express from 'express'
import sendEmail from '../routes/sendEmail/sendEmailRoutes.js'
import cors from 'cors'

const app = express()

app.set("port", process.env.PORT || 8080)

// middlewares
app.use(cors({
    origin: '*',
    methods: 'GET,POST',
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// routes
app.use("/email", sendEmail)

app.listen(app.get('port'), () => {
    console.log(`Server is running on port ${app.get('port')}`)
})