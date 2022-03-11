const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const Post = require('./models/Post')
const User = require('./models/User')
const Tag = require('./models/Tag')
const bcrypt = require('bcrypt')

const app = express()

app.use(cors())
app.use(cookieParser())
app.use(express.json())

const saltRounds = 10;

const PORT = process.env.PORT || 4001

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
        ],
        creator: "ehi",
        version: 1,
    })
    console.log(post)

    post.save().then(result => res.send(result)).catch(err => console.log(err))
})



/*                  ACCOUNT              */

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
            if (req.body.admin && req.body.adminPassword !== "1234")
            {
                res.send(false)
                return;
            }
            
            const user = new User({
                name: req.body.name,
                surname: req.body.surname,
                email: req.body.email,
                password: hash,
                preferiti: [],
                admin: req.body.admin
            })

            user.save().then(result => {
                res.cookie('token', result._id, { httpOnly: true })
                res.send(result)
            }).catch(err => res.send(err))
        })
    })
})



/*                  USER                     */

app.post('/user-id', (req, res) => {
    User.find({ _id: req.body.id }).then(result => res.send(result)).catch(err => res.send(err))
})

app.post('/user/cambio-nome', (req, res) => {
    User.updateOne({ _id: req.body.id }, { name: req.body.name }).then(result => res.send(result)).catch(err => res.send(err))
})

app.post('/user/cambio-cognome', (req, res) => {
    User.updateOne({ _id: req.body.id }, { surname: req.body.surname }).then(result => res.send(result)).catch(err => res.send(err))
})

app.post('/user/cambio-cognome', (req, res) => {
    User.updateOne({ _id: req.body.id }, { surname: req.body.surname }).then(result => res.send(result)).catch(err => res.send(err))
})

app.post('/user/cambio-password', (req, res) => {
    User.find({ _id: req.body.id }).then(result => {
        bcrypt.compare(req.body.vecchia, result[0].password, (err, resultHash) => {
            console.log("hash", resultHash)
            if (resultHash) {

                bcrypt.genSalt(saltRounds, function (err, salt) {
                    bcrypt.hash(req.body.nuova, salt, function (err, hash) {
                        User.updateOne({ _id: req.body.id }, { password: hash }).then(result2 => res.send(result2)).catch(err2 => res.send(err))
                    })
                })

            } else {
                res.send(false)
            }
        })
    })
})


/*                  POST                  */


//ritorna tutti gli articoli
app.post('/posts', (req, res) => {
    Post.find().then(result => res.send(result)).catch(err => res.send(err))
})

app.post('/post/exact', (req, res) => {
    Post.find({ _id: req.body.id }).then(result => res.send(result)).catch(err => res.send(err))
})

app.post('/post/add-preferito', (req, res) => {
    const { id, preferiti } = req.body

    User.updateOne({ _id: id }, { preferiti: preferiti }).then(result => res.send(result)).catch(err => res.send(err))
})

app.post('/post/remove-preferito', (req, res) => {
    const { id, preferiti } = req.body

    User.updateOne({ _id: id }, { preferiti: preferiti }).then(result => res.send(result)).catch(err => res.send(err))
})

app.post('/post', (req, res) => {
    Post.find({ _id: req.body.id }).then(result => res.send(result)).catch(err => res.send(err))
})

app.post('/post/add', (req, res) => {
    const post = new Post(req.body.post)

    post.save().then(res.send(post).catch(err => res.send(err)))
})

app.post('/post/data', (req, res) => {
    Post.find({ _id: req.body.id }).then(result => res.send(result)).catch(err => res.send(err))
})

app.post('/post/modifica', (req, res) => {
    const { post, id } = req.body

    const { title, description, blocks, time, modificato, version, tags } = post

    Post.updateOne({ _id: id }, { title, description, blocks, time, description, modificato, version, tags }).then(result => res.send(result)).catch(err => res.send(err))
})

app.post('/post/search/tag', (req, res) => {
    const { tags } = req.body

    console.log(tags)

    if (tags.length > 0)
        Post.find({ tags: { $all: tags } }).then(result => res.send(result)).catch(err => res.send(err))
    else
        Post.find().then(result => res.send(result)).catch(err => res.send(err))
})

/*                  TAG              */

app.post('/tag/all', (req, res) => {

    Tag.find().then(result => res.send(result)).catch(err => res.send(err))
})
app.post('/tag/update', (req, res) => {
    console.log(req.body.id)
    Tag.updateOne({ _id: req.body.id }, { tags: req.body.tags }).then(result => res.send(result)).catch(err => res.send(err))
})