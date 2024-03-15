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

// Not in use?
let user;

const express = require('express')
const cors = require('cors')
const app = express()
const {db, uploadData, fetchData, flashcards, uploadFlashcardSet, fetchFlashcardSet, deleteSet, updateSet, uploadUser, pushFavourite, removeFavourite, fetchFavourites, fetchUser, fetchFlashcardSetsBySearch } = require('./firebase.js')
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
        const flashcardId = req.params.id;
        console.log(flashcardId)
        const data = await fetchFlashcardSet(flashcardId);
        res.send(data);
    } catch (error) {
        console.log(error);
    }
})

app.get("/api/getFavourites/:id", async (req, res) => {
    try {
        const data = await fetchFavourites(req.params.id);
        res.send(data).status(200)
    } catch (e) {
        res.status(500).send(dbFail)
        console.log(e)
    }
})

app.get("/api/getFlashcardsBySearch/:searchTerm", async (req, res) => {
    try {
        const searchTerm = req.params.searchTerm;
        const data = await fetchFlashcardSetsBySearch(searchTerm);
        res.send(data);
    } catch (e) {
        console.log(e)
    }
})

app.get("/api/getFlashcardsBySearch/:searchTerm", async (req, res) => {
    try {
        const searchTerm = req.params.searchTerm;
        const data = await fetchFlashcardSetsBySearch(searchTerm);
        res.send(data);
    } catch (e) {
        console.log(e)
    }
})

app.post("/api/deleteSet", async (req, res) => {
    try {
        const { flashcardSetID } = req.body;
        await deleteSet(flashcardSetID);
        res.status(200).send(arr)
    } catch (error) {
        res.status(500).send()
        console.log(error)
    }
})

app.post("/api/updateSet", async (req, res) => {
    try {
        const set = req.body;
        const setId = { flashcardSetID } = req.body;
        await updateSet(setId, set);
        res.status(200).send(arr);
    } catch (e) {
        res.status(500).send(dbFail);
        console.log(e)
    }
})

app.post("/api/setFavourite", async (req, res) => {
    try {
        const { userID } = req.body
        const { flashcardSetID } = req.body
        console.log('puch')
        await pushFavourite(userID, flashcardSetID)
    } catch (e) {
        res.status(500).send(dbFail)
        console.log(e)
    }
})

app.post("/api/removeFavourite", async (req, res) => {
    try {
        const { userID } = req.body
        const { flashcardSetID } = req.body
        console.log('punch')
        await removeFavourite(userID, flashcardSetID)
    } catch (e) {
        res.status(500).send(dbFail)
        console.log(e)
    }
})

app.post('/api/setupUser', async (req, res) => {
    const { userID } = req.body
    const user = req.body

    try {

        if (!fetchUser(userID)) {
            await uploadUser(userID, user);
        }

        res.status(200).send(arr)
        
    } catch (e) {
        res.status(500).send(e)
        console.log(e)
    }
})

app.post('/api/editUser', async (req, res) => {
    const { data } = req.body;
    const dat = req.body;
    console.log(data);
    console.log(dat);
    // const user = req.body;
    // const { uid } = req.body
    // const userData = fetchData("user", uid)
    // const name = userData['name'];
    // const sets = userData['sets'];
    // const favourites = userData['favourites'];
    // user = new User(name, uid, sets, favourites);
    res.status(200).send(arr)
})

app.post('/api/uploadSet', async (req, res) => {
    const { payload } = req.body;
    await uploadFlashcardSet(payload.flashcardSetID, payload);
    // Further logic related to saving the set
    res.status(200).send(arr);
});

app.listen(5001, () => {console.log("server startet")})


const main = async (id) => {
    try {
        const data = await fetchData('users', 'AoQ73KqfcOeMbrdp6zs1s5Ux7IF2');
        console.log(data); 
    } catch (e) {
        console.log(e)
    }
  };

  const data = main('AoQ73KqfcOeMbrdp6zs1s5Ux7IF2');

