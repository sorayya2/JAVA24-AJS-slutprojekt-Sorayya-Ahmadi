import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  push,
  onValue,
  update,
  remove
} from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBCcq_bofiQTznEjHEgg_vMq4-0xynUlQ0",
  authDomain: "slutprojekt-99e3b.firebaseapp.com",
  projectId: "slutprojekt-99e3b",
  storageBucket: "slutprojekt-99e3b.appspot.com",
  messagingSenderId: "58908993912",
  appId: "1:58908993912:web:fb3ff25f068fc7a8ce408d",
  databaseURL: "https://slutprojekt-99e3b-default-rtdb.europe-west1.firebasedatabase.app"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref, push, onValue, update, remove };
