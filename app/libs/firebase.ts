// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyD4x-j4jP50cnkkfJ4g6LmAvaYTLCJSnQY',
    authDomain: 't-shirt-creator.firebaseapp.com',
    projectId: 't-shirt-creator',
    storageBucket: 't-shirt-creator.appspot.com',
    messagingSenderId: '605415873245',
    appId: '1:605415873245:web:b9fc3e195e41b1f83b5934',
    measurementId: 'G-9HDGM0S4LW',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const firebaseAnalytics =
    app.name && typeof window !== 'undefined' ? getAnalytics(app) : null
export const auth = getAuth(app)

export default app
