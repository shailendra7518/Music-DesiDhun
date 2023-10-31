
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey:import.meta.env.VITE_API_KEY ,
  authDomain: "testing-4e7eb.firebaseapp.com",
  projectId: "testing-4e7eb",
  storageBucket: "testing-4e7eb.appspot.com",
  messagingSenderId: "720035393305",
  appId: import.meta.env.VITE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;



