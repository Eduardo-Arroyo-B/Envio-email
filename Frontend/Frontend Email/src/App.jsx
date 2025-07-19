import { useState } from 'react'

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    company: '',
    RFC: '',
    fullAddress: '',
    additionalComments: ''
  })

  const [status, setStatus] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('Enviando...')

      console.log(import.meta.env.VITE_API_URL)
      const API_URL = import.meta.env.VITE_API_URL

      const url = `${API_URL}/email/sendEmail`

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setStatus('Correo enviado exitosamente.')
        setFormData({
          fullName: '',
          phone: '',
          company: '',
          RFC: '',
          fullAddress: '',
          additionalComments: ''
        })
      } else {
        const error = await response.json()
        setStatus(`Error: ${error.message || 'No se pudo enviar el correo'}`)
      }
    } catch (error) {
      setStatus('Error al enviar el correo.')
      console.error(error)
    }
  }

  return (
      <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto' }}>
        <h2>Formulario de Contacto</h2>

        <label>Nombre completo:</label>
        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />

        <label>Teléfono:</label>
        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />

        <label>Empresa:</label>
        <input type="text" name="company" value={formData.company} onChange={handleChange} required />

        <label>RFC:</label>
        <input type="text" name="RFC" value={formData.RFC} onChange={handleChange} required />

        <label>Dirección completa:</label>
        <textarea name="fullAddress" value={formData.fullAddress} onChange={handleChange} required />

        <label>Comentarios adicionales:</label>
        <textarea name="additionalComments" value={formData.additionalComments} onChange={handleChange} required />

        <button type="submit">Enviar</button>

        {status && <p>{status}</p>}
      </form>
  )
}

export default ContactForm
