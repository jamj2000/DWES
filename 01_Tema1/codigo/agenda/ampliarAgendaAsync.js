const fs = require('fs')
const ARCHIVO = 'agenda.json'
const nuevosContactos = [
  {
    nombre: 'Elisa',
    telefono: 602222211,
    domicilio: { calle: 'Alterna', numero: 11, localidad: 'Montilla' },
    aficiones: ['senderismo', 'cine', 'lectura']
  },
  {
    nombre: 'Maria',
    telefono: 602222222,
    domicilio: { calle: 'Conquista', numero: 22, localidad: 'Espejo' },
    aficiones: ['teatro', 'lectura']
  },
  {
    nombre: 'Bernardo',
    telefono: 602222233,
    domicilio: { calle: 'Conquista', numero: 33, localidad: 'Espejo' },
    aficiones: ['cine', 'viajes']
  },
  {
    nombre: 'Alba',
    telefono: 602222244,
    domicilio: { calle: 'Aguadores', numero: 44, localidad: 'Cordoba' },
    aficiones: ['voluntariado']
  },
  {
    nombre: 'Sonia',
    telefono: 602222255,
    domicilio: { calle: 'Pilates', numero: 55, localidad: 'Malaga' },
    aficiones: ['lectura']
  },
  {
    nombre: 'Carlos',
    telefono: 602222266,
    domicilio: { calle: 'Madrid', numero: 66, localidad: 'Malaga' },
    aficiones: []
  },
  {
    nombre: 'Carla',
    telefono: 60222277,
    domicilio: { calle: 'Toledo', numero: 77, localidad: 'Cordoba' },
    aficiones: ['parapente', 'viajes']
  },
  {
    nombre: 'Elena',
    telefono: 602222288,
    domicilio: { calle: 'Ancha', numero: 88, localidad: 'Moriles' },
    aficiones: ['ajedrez', 'deporte']
  },
  {
    nombre: 'Cesar',
    telefono: 602222299,
    domicilio: { calle: 'Ancha', numero: 99, localidad: 'Cordoba' },
    aficiones: ['lectura']
  },
  {
    nombre: 'David',
    telefono: 602222200,
    domicilio: { calle: 'Francia', numero: 100, localidad: 'Moriles' },
    aficiones: ['teatro', 'viajar']
  }
]

// Lectura y escritura asincronas
// Leemos contactos anteriores en ARCHIVO
fs.readFile(ARCHIVO, (error, data) => {
  const json = JSON.parse(data)
  console.log(error ?? 'Lectura correcta')
  if (error) process.exit(1)

  // Agregamos nuevos contactos
  json.push(...nuevosContactos)

  // Volvemos a guardar contactos en ARCHIVO
  fs.writeFile(ARCHIVO, JSON.stringify(json, null, 2),
    (error) => { console.log(error ?? 'Escritura correcta') })
})
