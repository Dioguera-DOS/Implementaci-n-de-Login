const express = require('express')

const sessions = require('express-session');


const PORT = 8080
const app = express();




app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(sessions(
    {
        secret: 'coder123',
        resave: true,
        saveUninitialized: true
    }
))

app.get('/logout', (req, res) => {
    req.session.destroy(error => {
        if (error) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(200).json({ error: `error servidor intente más tarde` })
        }

    })


    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({ error: `ok` })
})



let users = [{ nombre: "Diogo", password: "123", rol: "user" }, { nombre: "Calos", password: "3242Abc", rol: "user" }, { nombre: "Julia", password: "abc123", rol: "admin" }]

app.get('/login', (req, res) => {
    let { nombre, password } = req.query

    if (!nombre || !password) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json({ error: `Complete your name and password.` })
    }

    let user = users.find(u => u.nombre === nombre && u.password === password)
    if (!user) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: `invalid credentials` })

    }

    req.session.user = user
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({
        resultado: `Login valid to ${user.nombre}`
    });
})


const auth = (req, res, next) => {
    if (!req.session.user) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(401).json({ error: `no existe usuarios logueados, enter de login page` })

    }

    next()
}

app.get('/datos', auth, (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({
        resultado: `Datos confidenciales`
    });
})

app.get('/', auth, (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({
        resultado: `Home Page`
    });
})


const server = app.listen(PORT, () => console.log("Server online port " + PORT))