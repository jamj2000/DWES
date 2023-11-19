import { MongoClient, ObjectId } from 'mongodb' // Documentación CRUD: https://mongodb.github.io/node-mongodb-native/6.2/
import express from "express"

const app = express()
app.use(express.json())  // IMPORTANTE: SOPORTE PARA JSON


const PORT = process.env.PORT ?? 3000
const DB_URL = process.env.MONGODB_URI ?? 'mongodb://localhost:27017'
const DB_NAME = process.env.DB_NAME ?? 'api'
const USERS = 'users'
const PRODUCTS = 'products'

const client = new MongoClient(DB_URL)

app.get("/", (request, response) => {
    response.redirect("/api/users")
})


// GET
app.get('/api/users', async (request, response) => {
    const database = client.db(DB_NAME);
    const collection = database.collection(USERS);

    const results = await collection.find({}).toArray()

    response.status(200).json(results) 
})

// POST 
app.post('/api/users', async (request, response) => {
    if (!request.is('json'))
        return response.json({ message: 'Debes proporcionar datos JSON' })

    const database = client.db(DB_NAME);
    const collection = database.collection(USERS);

    const { nombre, edad } = request.body
    const results = await collection.insertOne({ nombre, edad });

    return response.status(200).json(results)
})

// GET 
app.get('/api/users/:id', async (request, response) => {
    const database = client.db(DB_NAME);
    const collection = database.collection(USERS);

    const { id } = request.params
    const results = await collection.find({ _id: new ObjectId(id) }).toArray()

    response.status(200).json(results)
})

// PUT
app.put('/api/users/:id', async (request, response) => {
    if (!request.is('json'))
        return response.json({ message: 'Debes proporcionar datos JSON' })

    const database = client.db(DB_NAME);
    const collection = database.collection(USERS);

    const { id } = request.params
    const { nombre, edad } = request.body
    const results = await collection.updateOne({ _id: new ObjectId(id) }, { $set: { nombre, edad } });

    response.status(200).json(results)
})

// DELETE
app.delete('/api/users/:id', async (request, response) => {
    const database =  client.db(DB_NAME);
    const collection = database.collection(USERS);

    const { id } = request.params
    const results = await collection.deleteOne({ _id: new ObjectId(id) })
    response.status(200).json(results)
})

// -------------- PRODUCTS ------------------

// GET
app.get('/api/products', async (request, response) => {
    const database = client.db(DB_NAME);
    const collection = database.collection(PRODUCTS);

    const results = await collection.find({}).toArray()

    response.status(200).json(results) 
})

// POST 
app.post('/api/products', async (request, response) => {
    if (!request.is('json'))
        return response.json({ message: 'Debes proporcionar datos JSON' })

    const database = client.db(DB_NAME);
    const collection = database.collection(PRODUCTS);

    const { nombre, precio } = request.body
    const results = await collection.insertOne({ nombre, precio });

    return response.status(200).json(results)
})

// GET 
app.get('/api/products/:id', async (request, response) => {
    const database = client.db(DB_NAME);
    const collection = database.collection(PRODUCTS);

    const { id } = request.params
    const results = await collection.find({ _id: new ObjectId(id) }).toArray()

    response.status(200).json(results)
})

// PUT
app.put('/api/products/:id', async (request, response) => {
    if (!request.is('json'))
        return response.json({ message: 'Debes proporcionar datos JSON' })

    const database = client.db(DB_NAME);
    const collection = database.collection(PRODUCTS);

    const { id } = request.params
    const { nombre, precio } = request.body
    const results = await collection.updateOne({ _id: new ObjectId(id) }, { $set: { nombre, precio } });

    response.status(200).json(results)
})

// DELETE
app.delete('/api/products/:id', async (request, response) => {
    const database =  client.db(DB_NAME);
    const collection = database.collection(PRODUCTS);

    const { id } = request.params
    const results = await collection.deleteOne({ _id: new ObjectId(id) })
    response.status(200).json(results)
})

app.listen(PORT, () => console.log(`Servidor web iniciado en puerto: ${PORT}`))

