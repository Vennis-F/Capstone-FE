import { initializeApp } from 'firebase/app'
import { getMessaging } from 'firebase/messaging'

const firebaseConfig = {
  apiKey: 'AIzaSyBQ_s7rql8vgYW60hs9byVv35w0PMVR_TM',
  authDomain: 'capstone-notification-a2156.firebaseapp.com',
  projectId: 'capstone-notification-a2156',
  storageBucket: 'capstone-notification-a2156.appspot.com',
  messagingSenderId: '820079639165',
  appId: '1:820079639165:web:bb5c85410d113545370f14',
  measurementId: 'G-4HX9S2TJDS',
}

export const app = initializeApp(firebaseConfig)
export const messaging = getMessaging()
