require('dotenv').config()
const express = require('express')
const app = express()
const massive = require('massive')
const session = require('express-session')
const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env
const auth_ctrl = require('./controller/auth_controller')
app.use(express.json())
express.static(__dirname + '../src')
massive(CONNECTION_STRING)
.then(db => {
    app.set('db', db)
    console.log('db connected')
})
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60
    }
}))

app.listen(SERVER_PORT, () => {
    console.log('server up')
})

app.post('/user/login', auth_ctrl.login)
app.post('/user/register', auth_ctrl.register)
app.get('/user', auth_ctrl.checkUser, auth_ctrl.getSession)