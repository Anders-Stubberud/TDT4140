/**
 * Dette er Express API'et.
 */

const arr = {
    "status": "punch"
}

const express = require('express')
const cors = require('cors')
const app = express()
const db = require('./firebase.js')
const { doc, setDoc, collection } = require("firebase/firestore"); 
app.use(cors())
app.use(express.json());


app.get("/api", (req, res) => {
    res.send({"test" : ["gruppe 40 <3", "gruppe 40 <3 <3", "gruppe 40 <3 <3 <3"]})
})

app.post('/api/teste', async (req, res) => {
    const { en, tre } = req.body
    const docRef = 
    setDoc(collection(db, "teste"), { en, tre });

    res.status(200).send(arr)
})

app.listen(5000, () => {console.log("server startet")})
