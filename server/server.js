/**
 * Dette er Express API'et.
 */


const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())

app.get("/api", (req, res) => {
    res.send({"test" : ["gruppe 40 <3", "gruppe 40 <3 <3", "gruppe 40 <3 <3 <3"]})
})

app.listen(5000, () => {console.log("server startet")})
