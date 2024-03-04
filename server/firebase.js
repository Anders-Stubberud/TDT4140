const { initializeApp } = require("firebase/app");
const { getFirestore, doc, setDoc, getDoc, getDocs, collection, addDoc, updateDoc, arrayUnion, arrayRemove } = require('firebase/firestore')
const { firebase } = require('firebase/app');

const firebaseConfig = {
  apiKey: "AIzaSyCUtmsiv88rhzhOFOQuMhc7dV1k_ohjra8",
  authDomain: "flashy-3a502.firebaseapp.com",
  projectId: "flashy-3a502",
  storageBucket: "flashy-3a502.appspot.com",
  messagingSenderId: "754929424468",
  appId: "1:754929424468:web:8d4d120dc99b20050cf5c1",
  measurementId: "G-89FPG56HX9"
};

let app = initializeApp(firebaseConfig)
let db = getFirestore(app);
let flashcardSetCollection = "flashcardSets1"
let userCollection = "users"

const uploadData = async (col, sub, data) => {
    try {
        const document = doc(fireStoreDb, col, sub);
        await setDoc(document, data);
    } catch (error) {
        console.log(error)
    }
}

const uploadFlashcardSet = async (setId, data) => {
    try {
        await setDoc(doc(db, flashcardSetCollection, setId), data);
    } catch (e) {
        console.log(e)
    }
}

const uploadUser = async (userID, data) => {
    await setDoc(doc(db, userCollection, userID), data, { merge: true});
}

const fetchUser = async (userID) => {
    
    const docSnap = await (getDoc(doc(db, userCollection, userID)))
    
    if (docSnap.exists()) {
        return docSnap.data() //returns user
    } else {
        return null // user does not exist
    }
}

/**
 * Update a set with new information
 * 
 * @param {*} setId 
 * @param {*} data 
 */
const updateSet = async (setId, data) => {
    try {
        await setDoc(doc(db, flashcardSetCollection, setId), data, { merge: true });
    } catch (e) {
        console.log(e)
    }
}

const flashcards = async () => {
    try {
        const collectionRef = collection(db, flashcardSetCollection);
        const querySnapshot = await getDocs(collectionRef);
        const documents = querySnapshot.docs.map(doc => doc.data());
        return documents;
    } catch (error) {
        console.log(error)
    } 
}

const fetchFlashcardSet = async (id) => {
    return fetchData(flashcardSetCollection, id);
}

const pushFavourite = async (userID, flashcardSetID) => {
    await updateDoc(doc(db, userCollection, userID), {
        favourites: arrayUnion(flashcardSetID)
    })
}

const removeFavourite = async (userID, flashcardSetID) => {
    await updateDoc(doc(db, userCollection, userID), {
        favourites: arrayRemove(flashcardSetID)
    })
}

const fetchFavourites = async (userID) => {
    const user = await fetchData(userCollection, userID);
    const { favourites } = user;

    const flashcardSets = [];

    if (favourites.length === 0) {
        return flashcardSets
    }

    for (const id of favourites) {
        try {
            const set = await fetchFlashcardSet(id);
            flashcardSets.push(set);
        } catch (e) {
            console.log(e)
        }
    }

    return flashcardSets;
};


const deleteSet = async (id) => {
    await deleteDoc(doc(db, flashcardSetCollection, id));
}

const fetchData = async (col, sub) => {
    try {
        const docRef = doc(db, col, sub);
        // const docSnap = await doc(docRef);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data()
          } else {
            // TODO: mer passende feilmelding/exception
            console.log("No such document!");
          }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    uploadData,
    fetchData,
    flashcards,
    uploadFlashcardSet,
    fetchFlashcardSet,
    deleteSet,
    updateSet,
    uploadUser,
    pushFavourite,
    removeFavourite,
    fetchFavourites,
    fetchUser
};