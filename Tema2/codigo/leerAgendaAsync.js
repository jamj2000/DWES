const fs = require('fs')
const ARCHIVO = 'agenda.json'
let contactos = []

// Lectura de archivo asincrona
fs.readFile(ARCHIVO, 'utf8',
  (error, datos) => {
    contactos = JSON.parse(datos)
    console.log(error ?? contactos)
  }
)
