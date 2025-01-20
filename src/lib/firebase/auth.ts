import { applyActionCode, createUserWithEmailAndPassword, inMemoryPersistence, setPersistence, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./clientApp";
import { AuthError, FormError } from "../util/AppError";


export const _createUserWithEmailAndPassword = async(username:string,password:string)=>{
    try{

        const credential = await createUserWithEmailAndPassword(auth,username,password)

        await Promise.all([
            //updateProfile(credential.user,{displayName:name}),//should update via firestore function
            //sendEmailVerification(credential.user)
        ])
        
    }catch(error:any){
        if(error.code == "auth/email-already-in-use") throw new FormError("username","Email address already in use.")
        else if(error.code == "auth/invalid-email") throw new FormError("username","Please type email address correctly.")
        else if(error.code == "auth/weak-password") throw new FormError("password","New password is not strong enough.")
        else console.error(error)
    }
}

export const _signInWithEmailAndPassword = async(username:string,password:string) => {
    
    try{
        await setPersistence(auth, inMemoryPersistence)
        
        const credential = await signInWithEmailAndPassword(auth,username,password);
        
        return credential
        
    }catch(error:any){
        if(error.code == "auth/invalid-email" || error.code == "auth/wrong-password" || error.code == "auth/user-not-found") throw new AuthError("Either email address or password are incorrect.")
        else if(error.code == "auth/too-many-requests") throw new AuthError("Too many failed login attempts. Access currently disabled or you may activate it by resetting your password or you may try again later.")
        else if(error.code == "auth/user-disabled") throw new AuthError("Sorry your account has been disabled.")
        else console.error(error)
    }
}

export const _signOut = async ()  =>{
    
    try{
        await auth.signOut()
    }catch(error){
        throw error
    }
}

export const _verifyEmail = async (code:string) =>{

    try{
        
        await applyActionCode(auth,code)

        return true

    }catch(error:any){

        if(error.code == "auth/expired-action-code") throw new AuthError("Verification link is expired.")
        else if(error.code == "auth/invalid-action-code") throw new AuthError("Verification link is no longer valid.")
        else if(error.code == "auth/user-disabled") throw new AuthError("Sorry your account has been disabled.")
        else if(error.code == "auth/user-not-found") throw new AuthError("No such account associated with the verification link.")
        else console.error(error)
    }
}