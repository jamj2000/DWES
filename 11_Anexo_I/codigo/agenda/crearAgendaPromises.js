const fs = require('fs')
const ARCHIVO = 'agenda.json'

const contactos = [
  {
    nombre: 'Ana Perez',
    telefono: 602112233,
    domicilio: {
      calle: 'Nueva',
      numero: 1,
      localidad: 'Montilla'
    },
    aficiones: ['cine', 'lectura']
  },
  {
    nombre: 'Eva Garcia',
    telefono: 602112244,
    domicilio: {
      calle: 'Antigua',
      numero: 2,
      localidad: 'Montilla'
    },
    aficiones: ['cine', 'senderismo']
  },
  {
    nombre: 'Isabel Rubio',
    telefono: 602112255,
    domicilio: {
      calle: 'Ancha',
      numero: 3,
      localidad: 'Moriles'
    },
    aficiones: ['lectura']
  },
  {
    nombre: 'Jose Redondo',
    telefono: 602112266,
    domicilio: {
      calle: 'Estrecha',
      numero: 4,
      localidad: 'Moriles'
    },
    aficiones: ['cine', 'teatro']
  },
  {
    nombre: 'Juan Garrido',
    telefono: 602112277,
    domicilio: {
      calle: 'Nueva',
      numero: 1,
      localidad: 'Cordoba'
    },
    aficiones: ['parapente', 'viajes']
  }
]

// Escritura de archivo con promesas
fs.promises.writeFile(ARCHIVO, JSON.stringify(contactos, null, 2), 'utf-8')
  .then(() => console.log('Archivo creado correctamente'))
  .catch((error) => console.error(error))