const express = require('express')
const app = express()

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

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/contacts', (request, response) => {
  response.json(contacts)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})