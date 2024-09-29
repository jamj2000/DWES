const fs = require('fs')

// Creación de archivo leeme.txt
const datos = `
Este contenido ha sido generado desde Javascript
y escrito en un archivo desde NodeJS.

Chao.
`

fs.writeFile('leeme.txt', datos, (error) => {
  if (error) { console.log(error) } else { console.log('Archivo creado exitosamente') }
})

// Lectura de archivo leeme.txt
fs.readFile('leeme.txt', 'utf8', (error, datos) => {
  if (error) { console.error(error) } else { console.log(datos) }
})
