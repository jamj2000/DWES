const express = require('express')
const path = require('path')
const app = express()

app.use( express.static( path.join (__dirname, 'public') )  );

app.get('/hola', (request, response) => {
  response.send('<h1> Hola usuario </h1>');
})

app.get('/hola/:nombre', (request, response) => {
    response.send(`<h1> Hola ${request.params.nombre} </h1>`);
})

app.get('/hola/:nombre/:apellidos', (request, response) => {
response.send(`<h1> 
Hola 
    ${request.params.nombre.toUpperCase()} &nbsp; 
    ${request.params.apellidos.toUpperCase()}
</h1>`);
})

app.get('/suma/:num1/:num2', (request, response) => {
    response.send(`<h1> 
    La suma es  
        ${ Number(request.params.num1) + Number(request.params.num2) }
    </h1>`);
})


app.get('/adios', (request, response) => {
    response.send('<h1> Hasta luego </h1>');
})

app.listen(3000)
