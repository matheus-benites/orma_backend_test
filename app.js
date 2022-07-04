const express = require('express')
const path = require('path')
const app = express()
const sqlite3 = require('sqlite3')
const db = new sqlite3.Database('./backendtest.db', sqlite3.OPEN_READWRITE)
const port = 3000


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')


db.run(
    `CREATE TABLE users (USERNAME, EMAIL, PHONE_NUMBER, POINTS)`
)


app.get('/', function(req, res) {
    if (req.query.userReferral) {
        res.render('signup', {referral: req.query.userReferral}) //add point to referral ID
    } else {
        res.render('signup')
    }
})

app.post('/signup/', function(req, res) {

    const username = req.body.username
    const email = req.body.email
    const phoneNumber = req.body.phoneNumber
    const userReferral = req.body.userReferral
    
    if (typeof username !== "undefined" && typeof email !== "undefined" && typeof phoneNumber !== "undefined") {
        let query = `INSERT INTO users (USERNAME, EMAIL, PHONE_NUMBER, POINTS) VALUES ('${username}', '${email}', '${phoneNumber}', 1)`
    }
    
    var specialLink = 'http://localhost:3000/?userReferral=' + username
    res.send('Special Link: ' + specialLink)
    
})

app.listen(port, function() {
    console.log(`Server is running in http://localhost:${port}`)
})
