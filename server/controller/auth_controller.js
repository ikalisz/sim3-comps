const bcrypt = require('bcryptjs')

module.exports = {
    register: async (req, res) => {
        const db = req.app.get('db')
        let {username, password, city, state} = req.body
        const result = await db.check_username({username})
        if (!result[0]) {
            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(password, salt)
            const user = await db.register_user({username, password: hash})
            const userInfo =  await db.register_user_info({city, state, user_id: user[0].user_id})
            console.log(user)
            req.session.user = {
                username: user[0].username,
                city: userInfo[0].city,
                state: userInfo[0].state,
                id: user[0].user_id
            }
            res.status(201).send(req.session.user)
        } else {
            res.status(401).send('Username already exists')
        }
        
    },
    login: async (req, res) => {
        const db = req.app.get('db')
        const {username, password} = req.body
        const result = await db.check_username({username})
        const user = result[0]
        if (user) {
            let checkPass = bcrypt.compareSync(password, user.password)
            if (checkPass) {
                req.session.user = {
                    username: user.username,
                    id: user.id,
                    city: user.city,
                    state: user.state
                }
                res.status(200).send(req.session.user)
            } else {
                return res.status(401).send('Username or password incorrect')
            }
        } else {
            res.status(401).send('Username not found')
        }
    },
    getSession: async (req, res) => {
        res.status(200).send(req.session.user)
    },
    checkUser: (req, res, next) => {
        if (req.session.user) {
            next()
        } else {
            res.status(401).send('Please login')
        }
    }
}