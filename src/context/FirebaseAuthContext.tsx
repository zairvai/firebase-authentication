'use client'

import { applyActionCode, createUserWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword,  signOut, User } from "firebase/auth";
import { SignUpWithEmailProps } from "@/lib/auth/type";
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { usePathname,useRouter } from "next/navigation";
import { authPathnames } from "@/global.config";
import { auth } from "@/lib/firebase/clientApp";
import { AuthError, FormError } from "@/lib/util/AppError";


type ContextProps = {
    user:User|null;
    isLoggedIn:boolean;
    isAuthorizing:boolean;
    signIn:(username:string,password:string)=>Promise<void>|null;
    register:(props:SignUpWithEmailProps)=>Promise<void>|null;
    // signInWithGoogle:()=>Promise<void>|null;
    signOut:()=>Promise<void>|null;
    verifyEmail:(code:string)=>Promise<boolean|undefined>|null;
    sendPasswordResetEmail:(email:string)=>Promise<boolean|undefined>|null;
}


const FirebaseAuthContext = createContext<ContextProps>({
    user:null,
    isLoggedIn:false,
    isAuthorizing:false,
    signIn:(username:string,password:string)=>null,
    register:(props:SignUpWithEmailProps)=>null,
    // signInWithGoogle:()=>null,
    signOut:()=>null,
    verifyEmail:(code:string)=>null,
    sendPasswordResetEmail:(email:string)=>null
})

export const useFirebaseAuth = () =>{
    return useContext(FirebaseAuthContext)
}

export function FirebaseAuthProvider({
    fallbackUrl,
    children
}:{
    fallbackUrl?:string
    children:ReactNode
}){

    
    const pathname =usePathname()
    const router = useRouter()

    const [user,setUser] = useState<User|null>(null)
    const [isAuthorizing,setAuthorizing] = useState<boolean>(false)
    const [isLoggedIn,setLoggedIn] = useState<boolean>(false)


    useEffect(()=>{
        setAuthorizing(true)

        const unsubscribe = onAuthStateChanged(auth,async (authUser)=>{
            // console.log(authUser)
            if(authUser){
                setUser(authUser)
                setLoggedIn(true)
                router.replace("/dashboard")
            }
            else{
                setUser(null)
                setLoggedIn(false)
                if(fallbackUrl){
                    
                    if(!authPathnames.find(elm=>elm===pathname)){
                        router.replace("/auth")
                    }
                    
                }
            }

            setAuthorizing(false)
        })

        return ()=>unsubscribe()
    },[])

    // useEffect(()=>{
    //     console.log(user)
    // },[user])

    const _register = useCallback(async(props:SignUpWithEmailProps)=>{

        try{
            const {username,password} = props

            const credential = await createUserWithEmailAndPassword(auth,username,password)
    
            await Promise.all([
                // updateProfile(credential.user,{displayName:name}),//should update via firestore function
                sendEmailVerification(credential.user)
            ])
            
        }catch(error:any){
            if(error.code == "auth/email-already-in-use") throw new FormError("username","Email address already in use.")
            else if(error.code == "auth/invalid-email") throw new FormError("username","Please type email address correctly.")
            else if(error.code == "auth/weak-password") throw new FormError("password","New password is not strong enough.")
            else if(error.code == "auth/password-does-not-meet-requirements") throw new FormError("password","Password must contain an upper case character, lower case character, non-alphanumeric")
            else {
                console.error(error)
                throw new AuthError("General Errors, please contact Administrator")
            }
        }

    },[])

    const _signIn = useCallback(async (username:string,password:string)=>{

        try{
            // await setPersistence(auth, inMemoryPersistence)
            
            await signInWithEmailAndPassword(auth,username,password);
                        
        }catch(error:any){
            if(error.code == "auth/invalid-email" || error.code == "auth/wrong-password" || error.code == "auth/user-not-found" || error.code == "auth/invalid-credential") throw new AuthError("Either email address or password are incorrect.")
            else if(error.code == "auth/too-many-requests") throw new AuthError("Too many failed login attempts. Access currently disabled or you may activate it by resetting your password or you may try again later.")
            else if(error.code == "auth/user-disabled") throw new AuthError("Sorry your account has been disabled.")
            else {
                
                console.error(error)
                throw new AuthError("General Errors, please contact Administrator")
            }
        }

    },[])

    const _signInWithGoogle = useCallback(async()=>{


    },[])

    const _signOut = useCallback(async()=>{
        
        try{

            // setAuthorizing(true)
            await signOut(auth)
            setUser(null)
            setLoggedIn(false)

        }catch(error){
            throw error
        }
    },[])

    const _verifyEmail = useCallback(async (code:string) =>{

        try{
            
            await applyActionCode(auth,code)
    
            return true
    
        }catch(error:any){
    
            if(error.code == "auth/expired-action-code") throw new AuthError("Verification link is expired.")
            else if(error.code == "auth/invalid-action-code") throw new AuthError("Verification link is no longer valid.")
            else if(error.code == "auth/user-disabled") throw new AuthError("Sorry your account has been disabled.")
            else if(error.code == "auth/user-not-found") throw new AuthError("No such account associated with the verification link.")
            else {
            
                console.error(error)
                throw new AuthError("General Errors, please contact Administrator")
            }
        }
    },[])

    const _sendPasswordResetEmail = useCallback(async (email:string) =>{

        try{
    
            await sendPasswordResetEmail(auth,email)
            return true
    
        }catch(error){
            console.log(error)
            throw error
        }

    },[])
    

    return(
        <FirebaseAuthContext.Provider value ={{
            user,
            signIn:_signIn,
            register:_register,
            // signInWithGoogle,
            signOut:_signOut,
            verifyEmail:_verifyEmail,
            sendPasswordResetEmail:_sendPasswordResetEmail,
            isLoggedIn,isAuthorizing}}>{children}
        </FirebaseAuthContext.Provider>
    )
}