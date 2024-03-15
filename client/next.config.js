/** @type {import('next').NextConfig} */

const nextConfig = {

    env: {
        apiKey: "AIzaSyCUtmsiv88rhzhOFOQuMhc7dV1k_ohjra8",
        authDomain: "flashy-3a502.firebaseapp.com",
        projectId: "flashy-3a502",
        storageBucket: "flashy-3a502.appspot.com",
        messagingSenderId: "754929424468",
        appId: "1:754929424468:web:8d4d120dc99b20050cf5c1",
        measurementId: "G-89FPG56HX9"
    },
    images: {
        domains: ['images.unsplash.com', 'source.unsplash.com', 'storage.googleapis.com', 'firebasestorage.googleapis.com'],
    },

}

module.exports = nextConfig