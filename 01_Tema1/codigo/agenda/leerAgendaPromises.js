const fs = require('fs')
const ARCHIVO = 'agenda.json'
let contactos = []

// Lectura de archivo con promesas
fs.promises.readFile(ARCHIVO, 'utf8')
  .then(datos => {
    contactos = JSON.parse(datos)
    console.log(contactos)
  })
  .catch(error => console.error(error))
