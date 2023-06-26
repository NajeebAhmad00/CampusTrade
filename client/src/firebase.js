import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: procss.env.REACT_APP_API_KEY,
    authDomain: procss.env.REACT_APP_AUTH_DOMAIN,
    projectId: procss.env.REACT_APP_PROJECT_ID,
    storageBucket: procss.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: procss.env.REACT_MESSAGING_SENDER_ID,
    appId: procss.env.REACT_APP_API_ID
}

const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)