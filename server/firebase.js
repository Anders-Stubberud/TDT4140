const { initializeApp } = require("firebase/app");
const { getFirestore, doc, setDoc, getDoc, getDocs, collection, addDoc } = require('firebase/firestore')
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
        await setDoc(doc(db, "flashcardSets1", setId), data);
    } catch (e) {
        console.log(e)
    }
}

const flashcards = async () => {
    try {
        const collectionRef = collection(db, 'flashcardSets1');
        const querySnapshot = await getDocs(collectionRef);
        const documents = querySnapshot.docs.map(doc => doc.data());
        return documents;
    } catch (error) {
        console.log(error)
    } 
}

const fetchFlashcardSet = async (id) => {
    return fetchData("flashcardSets1", id);
}

const deleteSet = async (id) => {
    await deleteDoc(doc(db, "flashcardSets1", id));
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
    deleteSet
};


const main = async () => {
    try {
        const collectionRef = collection(db, 'flashcardSets');
        const querySnapshot = await getDocs(collectionRef);
        const documents = querySnapshot.docs.map(doc => doc.data());
    } catch (error) {
        console.log(error)
    }    
};

// main();