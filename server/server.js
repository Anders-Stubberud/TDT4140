/**
 * Dette er Express API'et.
 */

const  { User } = require('./user.ts');

const arr = {
    "status": "success"
}

const dbFail = {
    "status": "Error in communication with db"
}

let user;

const express = require('express')
const cors = require('cors')
const app = express()
const {db, uploadData, fetchData, flashcards, uploadFlashcardSet, fetchFlashcardSet, deleteSet } = require('./firebase.js')
const { doc, setDoc, getDoc, collection } = require("firebase/firestore"); 
app.use(cors())
app.use(express.json());

//commented out so we can use the structure of this code later.
// app.get("/api", (req, res) => {
//     res.send({"test" : ["gruppe 40 <3", "gruppe 40 <3 <3", "gruppe 40 <3 <3 <3"]})
// })
// app.post('/api/teste', async (req, res) => {
//     const { en, tre } = req.body
//     const docRef = 
//     setDoc(collection(db, "teste"), { en, tre });

//     res.status(200).send(arr)
// })

app.get("/api/getFlashcards", async (req, res) => {
    try {
        const data = await flashcards();
        res.send(data);
    } catch (error) {
        console.log(error)
    } 
})

app.get("/api/getFlashcard/:id", async (req, res) => {
    try {
        const data = await fetchFlashcardSet(req.params.id);
        res.send(data);
    } catch (error) {
        console.log(error);
    }
})

app.delete("/api/deleteSet/:id", async (req, res) => {
    try {
        await deleteSet(id);
        res.status(200).send(arr)
    } catch (error) {
        res.status(500).send()
        console.log(error)
    }
})

app.post('/api/setupUser', async (req, res) => {
    const user = req.body;
    const { uid } = req.body
    const userData = fetchData("user", uid)
    const name = userData['name'];
    const sets = userData['sets'];
    const favourites = userData['favourites'];
    user = new User(name, uid, sets, favourites);
    res.status(200).send(arr)
})

app.post('/api/uploadSet', async (req, res) => {
    const { payload } = req.body;
    await uploadFlashcardSet(payload.flashcardSetID, payload);
    // Further logic related to saving the set
    res.status(200).send(arr);
});

app.listen(5001, () => {console.log("server startet")})
