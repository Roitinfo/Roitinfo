const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const Post = require('./models/Post')
const User = require('./models/User')
const bcrypt = require('bcrypt')

const app = express()

app.use(cors())
app.use(cookieParser())
app.use(express.json())

const saltRounds = 10;

const PORT = process.env.PORT || 3001

const dbURI = "mongodb+srv://NPI:1niconico1@roitinfo.9lzvj.mongodb.net/Roitinfo?retryWrites=true&w=majority";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(PORT, () => console.log(`Server started on port: ${PORT}`)))
    .catch((err) => console.log(err));

app.get('/newPost', (req, res) => {
    const post = new Post({
        title: "New post",
        text: "fjasòj fasdjfòl fdsajl òljfdsa",
        description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptates nostrum possimus blanditiis vitae nisi fugit officia sunt quo quas. Iste quasi id suscipit quia omnis in porro nihil facilis voluptatibus!",
        tags: [
            "prova1",
            "prova2",
            "prova3"
        ]
    })

    post.save().then(result => res.send(result)).catch(err => res.send(err))
})

//ritorna tutti gli articoli
app.post('/posts', (req, res) => {
    Post.find().then(result => res.send(result)).catch(err => res.send(err))
})

app.post('/post/exact', (req, res) => {
    Post.find({ _id: req.body.id }).then(result => res.send(result)).catch(err => res.send(err))
})

app.post('/login', (req, res) => {
    res.setHeader('Cache-Control', 'private');
    User.find({ email: req.body.email }).then(result => {
        console.log(result)
        if (result.length > 0) {
            bcrypt.compare(req.body.password, result[0].password, (err, resultHash) => {
                console.log("hash", resultHash)
                if (resultHash) {
                    res.send(result[0])
                } else {
                    res.send("false")
                }
            })
        } else {
            res.send(false)
        }

    }).catch(err => res.send(err))
})

app.post('/register/controllo-utente', (req, res) => {
    User.find({ email: req.body.email }).then(result => {
        if (result.length === 0) {
            res.send(true)
        } else {
            res.send(false)
        }
    })
})

app.post('/register', (req, res) => {
    res.setHeader('Cache-Control', 'private');
    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(req.body.password, salt, function (err, hash) {
            const user = new User({
                name: req.body.name,
                surname: req.body.surname,
                email: req.body.email,
                password: hash
            })

            user.save().then(result => {
                res.cookie('token', result._id, { httpOnly: true })
                res.send(result)
            }).catch(err => res.send(err))
        })
    })
})