/**
 * Dette er Express API'et.
 */


const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())

app.get("/api/", (req, res) => {
    res.send({"testing" : ["arrelm1", "arrelm2", "arrelm33"]})
})

app.listen(5000, () => {console.log("server startet")})
