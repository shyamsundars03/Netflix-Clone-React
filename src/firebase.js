import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore,addDoc ,collection}  from "firebase/firestore"
import { createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, signOut } from "firebase/auth";
import { toast } from "react-toastify";




const firebaseConfig = {
  apiKey: "AIzaSyC8Si1mA231t_zj2ebIJzzljzKyjo6tSew",
  authDomain: "netflixclone-d6187.firebaseapp.com",
  projectId: "netflixclone-d6187",
storageBucket: "netflixclone-d6187.appspot.com",

  messagingSenderId: "991836922515",
  appId: "1:991836922515:web:f6219618d0e9512a21a366"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app)

const signUp = async (name, email, password) =>{
 try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name: name,
            authProvider: "local",
            email: email
        });

    } catch (err) {
        console.log(err);
toast.error(err.code.split('/')[1].split('-').join(' '));
 
    }


}

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    toast.success("Logged in successfully!");
  } catch (err) {
    console.error("Login error:", err.code);

    if (err.code === "auth/invalid-credential") {
      toast.error("Invalid email or password. Please try again.");
    } else if (err.code === "auth/user-not-found") {
      toast.error("No account found with this email.");
    } else if (err.code === "auth/too-many-requests") {
      toast.error("Too many failed attempts. Try again later.");
    } else {
      toast.error("Login failed: " + err.code);
    }
  }
};


const logout = async () => {
    await signOut(auth);
};

export { auth, db, signUp, login, logout };
export default app; 







