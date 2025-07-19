import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import { check, validationResult } from 'express-validator'

dotenv.config()

console.log('SMTP Config:', {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE,
    user: process.env.EMAIL_USER
})


const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure:  process.env.EMAIL_SECURE === 'true', // verdadero para 465, falso para otros puertos
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false // Esto ignora el certificado TLS, si quieres una conexión segura, asegúrate de que el certificado sea válido y quita esta línea
    }
})

const sendEmail = async (req, res) => {
    const { fullName, phone, company, RFC, fullAddress, additionalComments } = req.body

    await check("fullName", "El nombre completo es obligatorio").notEmpty().run(req)
    await check("phone", "El RFC es obligatorio").notEmpty().run(req)
    await check("company", "El nombre completo es obligatorio").notEmpty().run(req)
    await check("RFC", "El nombre completo es obligatorio").notEmpty().run(req)
    await check("fullAddress", "El nombre completo es obligatorio").notEmpty().run(req)
    await check("additionalComments", "El nombre completo es obligatorio").notEmpty().run(req)

    const result = validationResult(req)

    if (!result.isEmpty()) {
        return res.status(400).json({ error: result.array() })
    }

    try {
        const sendEmail = await transporter.sendMail({
            from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM_EMAIL}>`,
            to: `"${process.env.EMAIL_TO_NAME}" <${process.env.EMAIL_TO}>`,
            subject: `Solicitud de contacto de la empresa ${company}`,
            html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <h2>Solicitud de contacto recibida</h2>
            <p>Estimado equipo de SONATRA,</p>
            <p>Se ha recibido una nueva solicitud de contacto a través del sitio web. A continuación, se detallan los datos proporcionados:</p>
            
            <ul style="list-style: none; padding: 0;">
                <li><strong>Nombre completo:</strong> ${fullName}</li>
                <li><strong>Teléfono de contacto:</strong> ${phone}</li>
                <li><strong>Nombre de la empresa:</strong> ${company}</li>
                <li><strong>RFC:</strong> ${RFC}</li>
                <li><strong>Dirección completa:</strong> ${fullAddress}</li>
                <li><strong>Comentarios adicionales:</strong> ${additionalComments}</li>
            </ul>

            <p>Por favor, atender esta solicitud a la brevedad posible.</p>

            <p>Atentamente,<br/>
            <em>Sistema de contacto - Sitio Web SONATRA</em></p>
        </div>
    `
        })



        if (!sendEmail) {
            return res.status(500).json({ message: 'Error al enviar el email' })
        }

        return res.status(201).json({ message: 'Email enviado correctamente' })
    } catch (error) {
        console.error('Ha ocurrido un problema al enviar el email', error)
        res.status(500).json({ message: 'Error al enviar el email' })
    }
}

export {
    sendEmail
}