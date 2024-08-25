const express = require('express')
const app = express()

app.use(express.json())

// variables y funciones
let contacts = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]


// definimos rutas -------------------------------------------------------------------------------------------------------------------
app.get('/', (request, response) => { // ruta principal
  response.send('<h1>Hello World!</h1>')
})

// ruta info
app.get('/info', (request, response) => {
  const date = new Date().toString()
  response.send(`<p>Phonebook has info for ${contacts.length} contacts</p><small><p>${date}</p></small>`)
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

    // confirma la operacion en la consola
    console.log('[-] Se ha eliminado el contacto con id', id)
})

// crear recurso
app.post('/api/contacts', (request, response) => {

    //obtenemos la id maxima de toda la lista de contactos
    const maxId = contacts.length > 0
        ? Math.max(...contacts.map(n => n.id))
        : 0

    const contact = {
      id: maxId + 1,
      name: request.body.name,
      number: request.body.number
    }
    
    // lo añadimos al array
    contacts.concat(contact)

    // respondemos en el server
    response.json(contact)

    console.log(contacts)
})


// connect server --------------------------------------------------------------------------------------------------------------------
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})