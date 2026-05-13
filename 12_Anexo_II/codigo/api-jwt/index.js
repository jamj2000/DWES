import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs"  // Hashing de contraseñas
import jwt from "jsonwebtoken" // Generacion y verificacion de tokens

const SECRET_KEY = "secreto" // Secreto para firmar y verificar el token
const app = express()


let Users = [
    { id: 0, nombre: "Jose", password: "$2b$10$jX4wnioguxvI26XtC..ZTupPTiE7ogww5NhUGWw0CDiL81PcFKEJ2" }, // password: jose
    { id: 1, nombre: "Ana", password: "$2b$10$l/.WxXkTG6pKVB7KYU/KROXVvH7nAQqyrsq5PW1b.1X4v6L2u00u2" }, // password: ana
    { id: 2, nombre: "Eva", password: "$2b$10$TW/qH6MQ/fd4sRijnHIdoekydhtIonurDMvxZHgqNaIR4st2A90Xe" }  // password: eva
]

let Products = [
    { id: 0, nombre: "Teclado", precio: 100 },
    { id: 1, nombre: "Ratón", precio: 80 },
    { id: 2, nombre: "Monitor", precio: 500 }
]



app.use(express.json())   // IMPORTANTE
app.use(cors())           // Para habilitar CORS


function verifyToken(request, response, next) {
    const token = request.headers.authorization?.split(" ")[1]; // formato "Bearer <token>"

    if (!token) return response.status(403).json({ message: "Token requerido" });

    try {
        request.user = jwt.verify(token, SECRET_KEY);
        next();
    } catch (err) {
        return response.status(403).json({ message: "Token inválido" });
    }
}



// LOGIN
app.post('/api/login', async (request, response) => {
    if (!request.is('json'))
        return response.json({ message: 'Debes proporcionar datos JSON' })

    const { nombre, password } = request.body

    const user = Users.find(u => u.nombre == nombre)

    if (user == undefined) {
        return response.json({ message: "Usuario no encontrado" })
    }

    // Comparamos la contraseña
    const correctPassword = await bcrypt.compare(password, user.password)

    if (!correctPassword) {
        return response.json({ message: "Contraseña incorrecta" })
    }

    // Generamos el token firmado con secreto
    const token = jwt.sign(
        { id: user.id, nombre: user.nombre },
        SECRET_KEY
    )

    response.json({ token })
})


// GET
app.get('/api/products', (request, response) => response.json(Products))

// GET 
app.get('/api/products/:id', (request, response) => {
    let prod = Products.find(p => p.id == request.params.id)

    if (prod !== undefined) { // Si es encontrado    
        return response.json(prod)
    } else {
        response.json({ message: 'El elemento no ha sido encontrado' })
    }
})


// POST 
app.post('/api/products', verifyToken, (request, response) => {
    if (!request.is('json'))
        return response.json({ message: 'Debes proporcionar datos JSON' })

    let sig = Math.max(...Products.map(prod => prod.id)) + 1

    const { nombre, precio } = request.body
    Products.push({ id: sig, nombre, precio })
    return response.json(Products)
})


// PUT
app.put('/api/products/:id', verifyToken, (request, response) => {
    if (!request.is('json'))
        return response.json({ message: 'Debes proporcionar datos JSON' })

    const { id } = request.params
    const { nombre, precio } = request.body

    // Obtenemos posición    
    const pos = Products.findIndex(prod => prod.id == id)

    if (pos != -1) { // Si es encontrado
        Products.splice(pos, 1, { id, nombre, precio })
        return response.json(Products)
    } else { // Sino
        response.json({ message: 'El elemento no ha sido encontrado' })
    }
})

// DELETE
app.delete('/api/products/:id', verifyToken, (request, response) => {
    // Obtenemos posición    
    const pos = Products.findIndex(prod => prod.id == request.params.id)

    if (pos != -1) { // Si es encontrado
        Products.splice(pos, 1)
        return response.json(Products)
    } else { // Sino
        response.json({ message: 'El elemento no ha sido encontrado' })
    }
})


app.listen(3000)

