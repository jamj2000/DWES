import express from 'express'

const app = express()

app.get('/', (request, respose) => {
    function mostrarUsuario(user) {
        return `
        <div><img src="${user.picture.large}"></div>
        <p>${user.name.first} ${user.name.last} </p>
        <small>${user.location.street.name}, ${user.location.street.number}, ${user.location.city}</small>
        <hr>
        `
    }

    fetch('https://randomuser.me/api/?results=4&nat=es&inc=name,location,phone,picture')
        .then(respuesta => respuesta.json())
        .then(datos => {
            let user = datos.results
            respose.send(`
            <h1>Página principal</h1>
            ${mostrarUsuario(user[0])}
            ${mostrarUsuario(user[1])}
            ${mostrarUsuario(user[2])}
            ${mostrarUsuario(user[3])}
         `)
        })


})

app.listen(3000, () => console.log("Servidor iniciado"))