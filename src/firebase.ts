import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCY72rS7IaAwqTGS-qLNbDUNiUiW0rFing",
  authDomain: "water-quality-monitoring-d9f81.firebaseapp.com",
  databaseURL: "https://water-quality-monitoring-d9f81-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "water-quality-monitoring-d9f81",
  storageBucket: "water-quality-monitoring-d9f81.appspot.com",
  messagingSenderId: "638920929245",
  appId: "1:638920929245:web:e4d2d241decfaa96f81034"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
