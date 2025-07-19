# 📬 Formulario de Contacto en React

Este proyecto implementa un formulario de contacto en React que envía los datos a una API utilizando fetch. El endpoint se configura mediante una variable de entorno para facilitar su personalización y seguridad.

🧾 Campos del formulario
El formulario recopila la siguiente información:

fullName: Nombre completo del usuario

phone: Teléfono de contacto

company: Nombre de la empresa

RFC: Registro Federal de Contribuyentes

fullAddress: Dirección completa

additionalComments: Comentarios adicionales

# ⚙️ Variables de entorno
Para configurar el endpoint de envío del correo electrónico, define la siguiente variable en un archivo .env en la raíz del proyecto:

VITE_API_URL=https://tu-api.com/api
⚠️ En proyectos Vite, las variables de entorno deben comenzar con VITE_ para que estén disponibles en el cliente.


