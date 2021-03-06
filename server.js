const express = require('express')
const connectDB = require('./config/db')
const path = require('path')
const app = express()

//Connect database
connectDB()
//Init middleware
app.get("/",(req,res)=>res.send("hello"))
app.use(express.json({ extended: false }))

app.use('/api/users', require('./routes/user'))

app.use('/api/auth', require('./routes/auth'))
app.use('/api/vender', require('./routes/list'))

//Serve static assests in production

if (process.env.NODE_ENV === 'production') {
    //set static folder
    app.use(express.static('client/build'))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server is running on post ${PORT}`))
