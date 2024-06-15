import express from "express";
import cors from "cors";

const app = express()


let Users = [
    { id: 0, nombre: "Jose", edad: 20 },
    { id: 1, nombre: "Juan", edad: 21 },
    { id: 2, nombre: "Eva", edad: 22 }
]

app.use(express.json())   // IMPORTANTE
app.use(cors())           // Para habilitar CORS


// GET
app.get('/api/users', (request, response) => response.json(Users))

// POST 
app.post('/api/users', (request, response) => {
    if ( !request.is('json') )
        return response.json({ message: 'Debes proporcionar datos JSON' })

    let sig = Math.max( ...Users.map( u => u.id ))+1

    const { nombre, edad } = request.body
    Users.push({ id: sig, nombre, edad })
    return response.json(Users)
})

// GET 
app.get('/api/users/:id', (request, response) => {
    let usuario = Users.find(user => user.id == request.params.id)

    if (usuario !== undefined) { // Si es encontrado    
        return response.json(usuario)
    } else {
        response.json({ message: 'El elemento no ha sido encontrado' })
    }
})

// PUT
app.put('/api/users/:id', (request, response) => {
    if ( !request.is('json') )
        return response.json({ message: 'Debes proporcionar datos JSON' })

    const { id } = request.params
    const { nombre, edad } = request.body

    // Obtenemos posición    
    const pos = Users.findIndex(user => user.id == id)

    if (pos != -1) { // Si es encontrado
        Users.splice(pos, 1, { id, nombre, edad })
        return response.json(Users)
    } else { // Sino
        response.json({ message: 'El elemento no ha sido encontrado' })
    }
})

// DELETE
app.delete('/api/users/:id', (request, response) => {
    // Obtenemos posición    
    const pos = Users.findIndex(user => user.id == request.params.id)

    if (pos != -1) { // Si es encontrado
        Users.splice(pos, 1)
        return response.json(Users)
    } else { // Sino
        response.json({ message: 'El elemento no ha sido encontrado' })
    }
})


app.listen(3000)

