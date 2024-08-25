const express = require('express')
const app = express()

// variables y funciones
let contacts = [
  {
    id: '1',
    name: 'Sergio Garcia',
    phone: '612 345 678'
  },

  {
    id: '2',
    name: 'Ada Lovelace',
    phone: '571 612 348'
  },

  {
    id: '3',
    name: 'Dan Hemsworth',
    phone: '581 275 965'
  }
]


// definimos rutas -------------------------------------------------------------------------------------------------------------------
app.get('/', (request, response) => { // ruta principal
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/contacts', (request, response) => { // ruta que contiene todas los contactos de la API
  response.json(contacts)
})

app.get('/api/contacts/:id', (request, response) => {
    // extrae la id de la solicitud
    const id = request.params.id

    // encuentra el contacto cuya id === :id
    const contact = contacts.find(contact => contact.id === id)

    // devuelve un json con ese unico contacto
    response.json(contact)
})


// connect server --------------------------------------------------------------------------------------------------------------------
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})