import express from 'express'

const app = express()

/* Ejemplos
- http://localhost:3000/github/microsoft?pag=1
- http://localhost:3000/github/oracle?pag=2
- http://localhost:3000/github/google?pag=20
*/
app.get('/github/:organizacion', async (req, res) => {
    const org = req.params.organizacion  // Path parameter
    const pag = req.query.pag            // Query parameter (Query string)
    const data = await fetch(`https://api.github.com/orgs/${org}/repos?per_page=100&page=${pag}`)
    const json = await data.json()
    if (json.message) {
        // Ocurrió algún evento, como límite de peticiones excedido
        res.send(`<h1>${json.message}</h1> <h2>${json.documentation_url}</h2>`)
    } else {
        res.send(`
        <h1>Página ${pag}, ${json.length ?? 0} repositorios.</h1>
        <small>Máximo de resultados: 100</small><hr>              
        ${json.length
            &&
            json.map(repo => `
                <h4><a href="${repo.html_url}" target="_blank">${repo.name}</a></h4>
                <em>${repo.language}: </em>  <strong>${repo.description}</strong>
                <br><small>Creado en ${repo.created_at}. Último push en ${repo.pushed_at} </small>
                `)
                .join('<br><hr>')
            ||
            'Nada por aquí'
            }
        `)
    }
})

app.listen(3000)