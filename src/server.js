const express = require("express")
const server = express()
const routes = require('./routes')
const path = require("path")

// engine EJS
server.set('view engine', 'ejs')

// Mudar a localização da views
server.set('views', path.join(__dirname, 'views'))

// utilizando os arquivos static
server.use(express.static("public"))

// autorizando o req.body
server.use(express.urlencoded( { extended: true }))

// ROUTES
server.use(routes)


server.listen(3000, () => console.log("rodando"))
