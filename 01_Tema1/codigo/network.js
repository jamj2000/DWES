const os = require('os')
const fs = require('fs')

const ARCHIVO = 'network.json'
const data = os.networkInterfaces()

const callbackWrite = (error) => {
  if (error) { console.log(error) } else { console.log('Archivo creado exitosamente') }
}

const callbackRead = (error, datos) => {
  if (error) { console.log(error) } else { console.log(JSON.parse(datos)) }
}

// Escritura en archivo
fs.writeFile(ARCHIVO, JSON.stringify(data), 'utf8', callbackWrite)

// Lectura de archivo
fs.readFile(ARCHIVO, 'utf8', callbackRead)
