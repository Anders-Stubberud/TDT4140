const { initializeApp } = require("firebase/app");
const { getFirestore, 
        doc, 
        setDoc,
        getDoc,
        getDocs
    } = require('firebase/firestore')

const firebaseConfig = {
  apiKey: "AIzaSyCUtmsiv88rhzhOFOQuMhc7dV1k_ohjra8",
  authDomain: "flashy-3a502.firebaseapp.com",
  projectId: "flashy-3a502",
  storageBucket: "flashy-3a502.appspot.com",
  messagingSenderId: "754929424468",
  appId: "1:754929424468:web:8d4d120dc99b20050cf5c1",
  measurementId: "G-89FPG56HX9"
};

let app;
let fireStoreDb;

const initializeFirebaseApp = () => {
    try {
        app = initializeApp(firebaseConfig);
        fireStoreDb = getFirestore();
        return app;
    } catch (error) {
        console.log(error);
    }
}

const getFirebaseApp = () => app;

const uploadProcessedData = async (col, sub, data) => {
    try {
        const document = doc(fireStoreDb, col, sub);
        await setDoc(document, data);
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    initializeFirebaseApp,
    getFirebaseApp
};

const main = async () => {
    try {
        initializeFirebaseApp()
        await uploadProcessedData("teste", "noe", {"hei": "på deg"})
        console.log('success')
    } catch (error) {
        console.log(error)
    }
}

main();
