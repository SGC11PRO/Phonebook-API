const express = require('express')
const app = express()

app.use(express.json())

// variables y funciones
let contacts = [
  {
    id: 1,
    name: 'Sergio Garcia',
    phone: '612 345 678'
  },

  {
    id: 2,
    name: 'Ada Lovelace',
    phone: '571 612 348'
  },

  {
    id: 3,
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
    const id = Number(request.params.id)

    // encuentra el contacto cuya id === :id
    const contact = contacts.find(contact => contact.id === id)

    // devuelve un json con ese unico contacto unicamente si encuentra la nota
    if(contact) 
    {
        response.json(contact)
    }
    else
    {
        response.status(404).end() // enviamos un 404 not found
    }
})


// eliminar recurso
app.delete('/api/contacts/:id', (request, response) => {
    const id = Number(request.params.id)
    contacts = contacts.filter(contact => contact.id !== id)

    response.status(204).end() // enviamos un 204 no content
})

// crear recurso
app.post('/api/contacts', (request, response) => {

    //obtenemos la id maxima de toda la lista de contactos
    const maxId = contacts.length > 0
        ? Math.max(...contacts.map(n => n.id))
        : 0

    const contact = request.body
    
    // asignamos la id
    contact.id = maxId + 1
    
    // lo añadimos al array
    contacts.concat(contact)

    // respondemos en el server
    response.json(contact)
    console.log('Created ', contact)
})


// connect server --------------------------------------------------------------------------------------------------------------------
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})