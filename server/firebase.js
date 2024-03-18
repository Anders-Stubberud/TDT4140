const { initializeApp } = require("firebase/app");
const { getFirestore, doc, setDoc, getDoc, getDocs, collection, addDoc, updateDoc, arrayUnion, arrayRemove, query, deleteDoc, where } = require('firebase/firestore')
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
let flashcardSetCollection = "flashcardSets2"
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

const editUserInformation = async (userID, data) => {
    await updateDoc(doc(db, userCollection, userID), data)
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
    const userRef = doc(db, userCollection, userID);
        if (!userRef) {
            console.error("Invalid user reference");
            return;
        }

        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
            const userData = userDoc.data();
            
            if (userData && userData.favourites) {
                const updatedFavourites = userData.favourites.filter(id => id !== flashcardSetID);

                await updateDoc(userRef, {
                    favourites: updatedFavourites
                });
            } else {
                console.error("Favourites field is missing or null");
            }
        } else {
            console.error("User document does not exist");
        }
}

const fetchFavourites = async (userID) => {
    const user = await fetchData(userCollection, userID);

    const flashcardSets = [];
    
    if (!user) {
        return flashcardSets;
    }

    const { favourites: favourites = [] } = user;

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


const fetchFlashcardSetsBySearch = async(searchTerm) => {

    const data = await flashcards()
    if (searchTerm.length === 0) {
        return data
    }
    const matchedElements = data.filter(set => set.name && set.name.includes(searchTerm))
    return matchedElements
}

const deleteSet = async (flashcardSetID) => {
    const q = query(collection(db, userCollection), where("favourites", "array-contains", flashcardSetID));
    try {
        const querySnapshot = await getDocs(q);
        for (const doc of querySnapshot.docs) {
            const user = doc.data();
            await removeFavourite(user.userID, flashcardSetID);
        }

        await deleteDoc(doc(db, flashcardSetCollection, flashcardSetID));
    } catch (error) {
        console.error("Error querying and removing flashcard set:", error);
    }
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

// const main = async (id) => {
//     try {
//         console.log(flashcards())
//     } catch (e) {
//         console.log(e)
//     }
//   };

//   const data = main('AoQ73KqfcOeMbrdp6zs1s5Ux7IF2');

module.exports = {
    uploadData,
    fetchData,
    flashcards,
    uploadFlashcardSet,
    fetchFlashcardSet,
    deleteSet,
    fetchFlashcardSetsBySearch,
    updateSet,
    uploadUser,
    pushFavourite,
    removeFavourite,
    fetchFavourites,
    fetchUser,
    editUserInformation
};
