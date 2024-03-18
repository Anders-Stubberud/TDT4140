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

const { Storage } = require("@google-cloud/storage");
const express = require('express')
const cors = require('cors')
const multer = require('multer');
const app = express();
const port = 5001;
const mults = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1000 * 1024 * 1024,
  },
});
app.use(cors());
const cloudStorage = new Storage({
  keyFilename: `${__dirname}/serviceAccount.json`,
  projectId: "flashy-3a502",
});
const bucketName = "gs://flashy-3a502.appspot.com";
const bucket = cloudStorage.bucket(bucketName);
const {db, uploadData, fetchData, editUserInformation, flashcards, uploadFlashcardSet, fetchFlashcardSet, deleteSet, updateSet, uploadUser, pushFavourite, removeFavourite, fetchFavourites, fetchUser, fetchFlashcardSetsBySearch } = require('./firebase.js')
const { doc, setDoc, getDoc, collection } = require("firebase/firestore"); 
const { getStorage, ref, uploadBytes } = 'firebase/storage';
app.use(express.json());
const { v4: uuidv4 } = require('uuid');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccount.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'gs://flashy-3a502.appspot.com'
});

app.get("/api/getUserInformation/:userID", async (req, res) => {
    try {
        const userID = req.params.userID;
        const data = await fetchUser(userID);
        res.send(data);
    } catch (error) {
        console.log(error)
    } 
})

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
        const data = await fetchFlashcardSet(flashcardId);
        console.log("62" + data.json);
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
        await removeFavourite(userID, flashcardSetID)
    } catch (e) {
        res.status(500).send(dbFail)
        console.log(e)
    }
})

app.get("/api/userExists/:id", async (req, res) => {
    try {
        const userID = req.params.id;
        const user = await fetchUser(userID);
        const userExists = !!user;
        res.json({ userExists });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post('/api/setupUser', async (req, res) => {
    const { userID } = req.body
    const user = req.body
    console.log('punch');
    try {
        if (! await fetchUser(userID)) {
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
    // const user = req.body;
    // const { uid } = req.body
    // const userData = fetchData("user", uid)
    // const name = userData['name'];
    // const sets = userData['sets'];
    // const favourites = userData['favourites'];
    // user = new User(name, uid, sets, favourites);
    res.status(200).send(arr)
})

// app.post('/api/uploadSet', async (req, res) => {
//     const { payload } = req.body;
//     await uploadFlashcardSet(payload.flashcardSetID, payload);
//     // Further logic related to saving the set
//     res.status(200).send(arr);
// });

app.post("/api/upload", mults.array("file"), async function (req, res, next) {

    const { cardIDToURLMapper, flashcardSetID, creatorID, setTitle, textRelatedToFlashcards, numberOfLikes, description, tags } = req.body;

    const newCardToURLMapper = JSON.parse(cardIDToURLMapper);
    const idToURLMapper = new Map();

    try {
        for (const fil of req.files) {
            const blob = bucket.file(fil.originalname);
            const blobStream = blob.createWriteStream();
            const promise = new Promise((resolve, reject) => {
                blobStream.on("error", (err) => {
                    reject(err);
                });
                blobStream.on("finish", async () => {
                    const expiration = Date.now() + 3155760000; //probably enough time

                    try {
                        const signedUrl = await blob.getSignedUrl({
                            action: 'read',
                            expires: expiration,
                        });

                        idToURLMapper.set(fil.originalname.split('_')[0], signedUrl);
                        resolve();
                    } catch (error) {
                        reject(error);
                    }
                });
                blobStream.end(fil.buffer);
            });

            // Wait for the promise to resolve before moving on to the next file
            await promise.catch(error => {
                console.error('Error generating signed URL:', error);
                next(error);
            });
        }

        const coverImageDefault = 'https://storage.googleapis.com/flashy-3a502.appspot.com/3065d085-d0e6-4f74-8289-2e4e7d5ab1bf.png?GoogleAccessId=firebase-adminsdk-j0zai%40flashy-3a502.iam.gserviceaccount.com&Expires=1713652749&Signature=GppZUlDvIPQsPE%2Fa3jhUg2AsR5zUhSvWiduVm%2BwOZMirLgtpsA2bC7bfHLmrIB72ryvsNcx2RFuGrD3BsbAPGLkNcAb%2F4AKn3QvaX985RMFbsQkxBY%2Bs%2FI%2BPzic7Q2MnAXMtRsvbJBg5ooab%2FKf2BE9Tw4Z5KudQ9K%2BRW%2BgoUSSbeJEfPdG0%2Fu1k5j140NAK4EJsnN3GJzh4qnW1fcNw9jC0Qtjy6Xn8oAbO7Wzwro1tMm%2F2OiKvw9R%2BaD0ZdGb4l38oIFLFOp6eXvEIGbG6if8B8rvZHfE6ZgKUTeDFoFJdMW8qO9YWEyZsGs0LNVsMXR6zWDNYmPQqEfy9v371Ow%3D%3D';
        let cvrImg = null;
        idToURLMapper.forEach((value, key) => {
            if (!key.startsWith("ANSWER") && !key.startsWith("QUESTION")) {
                cvrImg = value[0];
                return;
            }
        });

        const uploadData = {
            creatorID: creatorID,
            numberOfLikes: parseInt(numberOfLikes),
            flashcardSetID: flashcardSetID,
            setTitle: setTitle,
            coverImage: cvrImg ? cvrImg : newCardToURLMapper.hasOwnProperty(flashcardSetID) ? newCardToURLMapper[flashcardSetID] : coverImageDefault,
            description: description,
            tags: tags != '' ? JSON.parse(tags) : [],
            flashcards: JSON.parse(textRelatedToFlashcards).map(card => ({
                flashcardID: card.flashcardID,
                question: card.question,
                answer: card.answer,
                questionImage: idToURLMapper.has(`QUESTION-IMAGE${card.flashcardID}`) ? idToURLMapper.get(`QUESTION-IMAGE${card.flashcardID}`)[0] : newCardToURLMapper.hasOwnProperty(`question-${card.flashcardID}`) ? newCardToURLMapper[`question-${card.flashcardID}`] : null,
                answerImage: idToURLMapper.has(`ANSWER-IMAGE${card.flashcardID}`) ? idToURLMapper.get(`ANSWER-IMAGE${card.flashcardID}`)[0] : newCardToURLMapper.hasOwnProperty(`answer-${card.flashcardID}`) ? newCardToURLMapper[`answer-${card.flashcardID}`] : null,
            }))
        }
        console.log(uploadData);
        await uploadFlashcardSet(uploadData.flashcardSetID, uploadData);
        res.status(200).send(arr);

    } catch (error) {
        console.error('Error processing files:', error);
        res.status(500).send('Error processing files');
    }
});

app.post("/api/editUserProfile", mults.single("file"), async function (req, res, next) {

    const { userID, userName } = req.body;

    var profileImageURL = null

    try {
        if (req.file != undefined) {
            const file = req.file;
            const blob = bucket.file(file.originalname);
            const blobStream = blob.createWriteStream();
            const promise = new Promise((resolve, reject) => {
                blobStream.on("error", (err) => {
                    reject(err);
                });
                blobStream.on("finish", async () => {
                    const expiration = Date.now() + 3155760000; //probably enough time
                    try {
                        const signedUrl = await blob.getSignedUrl({
                            action: 'read',
                            expires: expiration,
                        });
                        profileImageURL = signedUrl[0];
                        resolve();
                    } catch (error) {
                        reject(error);
                    }
                });
                blobStream.end(file.buffer);
            });
            await promise.catch(error => {
                console.error('Error generating signed URL:', error);
                next(error);
            });
        }

        let uploadData;
        if (profileImageURL) {
            uploadData = {
                userName: userName,
                profilePictureURL: profileImageURL
            }
        } else {
            uploadData = {
                userName: userName,
            }
        }

        await editUserInformation(userID, uploadData);
        res.status(200).send(arr);

    } catch (error) {
        console.error('Error processing files:', error);
        res.status(500).send('Error processing files');
    }
});

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
