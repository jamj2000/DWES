const fs = require('fs')
const ARCHIVO = 'agenda.json'
let contactos = []

// Lectura de archivo sincrona
try {
  contactos = fs.readFileSync(ARCHIVO)
  contactos = JSON.parse(contactos)
  console.log(contactos)
} catch (error) {
  console.error(error)
}
