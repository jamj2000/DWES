const fs = require('fs')
const ARCHIVO = 'agenda.json'
let contactos = []
let encontrados = []

function buscar () {
  // Muestra el nombre de todos los contactos de Montilla
  console.log('\nCONTACTOS DE MONTILLA')
  encontrados = contactos.filter(c => c.domicilio.localidad === 'Montilla')
  encontrados.map(c => console.log(c.nombre))

  // Muestra el nombre y telefono de los contactos de Cordoba
  console.log('\nCONTACTOS DE CORDOBA')
  encontrados = contactos.filter(c => c.domicilio.localidad === 'Cordoba')
  encontrados.map(c => console.log(c.nombre, c.telefono))

  // Muestra los domicilios de los contactos de Cordoba
  console.log('\nCONTACTOS DE CORDOBA')
  encontrados = contactos.filter(c => c.domicilio.localidad === 'Cordoba')
  encontrados.map(c => console.log(c.domicilio))
  // encontrados.map(c => console.log(Object.values(c.domicilio).join(', ')))

  // Muestra el nombre de los contactos que tienen por aficion el cine.
  console.log('\nCONTACTOS QUE LES GUSTA EL CINE')
  contactos.filter(c => c.aficiones.includes('cine'))
    .map(c => console.log(c.nombre))

  // Muestra el nombre de los contactos que tienen por aficion el cine o el teatro.
  console.log('\nCONTACTOS QUE LES GUSTA EL CINE O EL TEATRO')
  contactos.filter(c => c.aficiones.includes('cine') || c.aficiones.includes('teatro'))
    .map(c => console.log(c.nombre))

  // Muestra el nombre de los contactos que tienen por aficion el cine y el teatro (ambos a la vez).
  console.log('\nCONTACTOS QUE LES GUSTA EL CINE Y EL TEATRO')
  contactos.filter(c => c.aficiones.includes('cine') && c.aficiones.includes('teatro'))
    .map(c => console.log(c.nombre))
}

// Lectura de archivo con Async/Away
async function buscarAgenda () {
  try {
    const data = await fs.promises.readFile(ARCHIVO, 'utf-8')
    contactos = JSON.parse(data)
    console.log('Lectura correcta')
    buscar()
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

buscarAgenda()
