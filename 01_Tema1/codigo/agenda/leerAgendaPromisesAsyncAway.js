const fs = require('fs')
const ARCHIVO = 'agenda.json'
let contactos = []

// Lectura de archivo con Async/Away
async function leerAgenda () {
  try {
    const datos = await fs.promises.readFile(ARCHIVO, 'utf8')
    contactos = JSON.parse(datos)
    console.log(contactos)
  } catch (error) {
    console.error(error)
  }
}

leerAgenda()
