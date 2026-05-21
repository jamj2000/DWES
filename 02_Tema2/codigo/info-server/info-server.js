import express from 'express'
import os from 'os'

const app = express()

app.get('/info-server', (request, response) => {
  response.send(`
    <h1>Información del Servidor</h1>
    <div><a href="/info-server/cpu"> CPU </a></div>
    <div><a href="/info-server/network"> NETWORK </a></div>
  `)
})

app.get('/info-server/cpu', (request, response) => {
  const cpu = os.cpus()
  console.log(cpu)

  response.send(`
    <h1>Información de la CPU del Servidor</h1>
    Este servidor tiene una CPU ${cpu[0].model} con ${cpu.length} hilos.
    <br>
    Las velocidades instantáneas de cada hilo son las siguientes:
    <br><br>
     ${cpu.map(item => '<li>' + item.speed + '</li>').join('')}
    `)
})

app.get('/info-server/network', (request, response) => {
  const interfaces = os.networkInterfaces()
  let resultado = ''
  for (let i in interfaces) {
    resultado += `
    <ul>
       <li>${i}</li>
       <ul>
       ${interfaces[i]
        .map(interfaz => '<li>' + interfaz.family + ': ' + interfaz.address + '</li>')
        .join('')}
       </ul>
    </ul>
    `
  }


  response.send(`
    <h1>Información de la RED del Servidor</h1>
    Este servidor tiene las siguientes interfaces de red:
    ${resultado}
    `)
})



app.listen(3000)