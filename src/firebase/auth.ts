import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./clientApp";

export const firebaseRegister = async  (email:string,password:string)  =>{

    try{
        const credential = await createUserWithEmailAndPassword(auth,email,password)
        const user = credential.user
        console.log(user)
    }catch(error){
        console.error("Error sign up with email and password", error);
    }

}

export const firebaseSignInWithEmail = async (email:string,password:string) =>{

    try{
        const credential = await signInWithEmailAndPassword(auth,email,password)
        const user = credential.user
        console.log(user)
    }catch(error){
        console.error("Error sign in with email and password", error);
    }

}