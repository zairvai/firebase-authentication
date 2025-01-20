'use client'

import { User } from "firebase/auth";
import { SignInWithEmailProps, SignUpWithEmailProps } from "@/lib/auth/type";
import { createContext, ReactNode, useCallback, useContext, useState } from "react";
import { _createUserWithEmailAndPassword, _signInWithEmailAndPassword, _signOut, _verifyEmail } from "@/lib/firebase/auth";

type ContextProps = {
    user:User|null;
    isLoggedIn:boolean;
    isAuthorizing:boolean;
    signIn:(username:string,password:string)=>Promise<void>|null;
    register:(props:SignUpWithEmailProps)=>Promise<void>|null;
    // signInWithGoogle:()=>Promise<void>|null;
    signOut:()=>Promise<void>|null;
    verifyEmail:(code:string)=>Promise<boolean|undefined>|null;
}


const FirebaseAuthContext = createContext<ContextProps>({
    user:null,
    isLoggedIn:false,
    isAuthorizing:false,
    signIn:(username:string,password:string)=>null,
    register:(props:SignUpWithEmailProps)=>null,
    // signInWithGoogle:()=>null,
    signOut:()=>null,
    verifyEmail:(code:string)=>null
})

export const useFirebaseAuth = () =>{
    return useContext(FirebaseAuthContext)
}

export function FirebaseAuthProvider({
    children
}:{
    children:ReactNode
}){

    const [user,setUser] = useState<User|null>(null)
    const [isAuthorizing,setAuthorizing] = useState<boolean>(false)
    const [isLoggedIn,setLoggedIn] = useState<boolean>(false)

    const signIn = useCallback(async (username:string,password:string)=>{

        try{

            setAuthorizing(true)
            const credential = await _signInWithEmailAndPassword(username,password)
            console.log(credential?.user)
        }catch(error){
            throw error
        }finally{
            setAuthorizing(false)
        }

    },[])

    const register = useCallback(async(props:SignUpWithEmailProps)=>{

        try{

            const credential = await _createUserWithEmailAndPassword(props.username,props.password)
            
            await Promise.all([
                //updateProfile(credential.user,{displayName:name}),//should update via firestore function
                //sendEmailVerification(credential.user)
            ])

        }catch(error){
            throw error
        }

    },[])

    const signOut = useCallback(async()=>{
        
        try{

            setAuthorizing(true)
            await _signOut()
            setUser(null)

        }catch(error){
            throw error
        }
    },[])

    const verifyEmail = async (code:string) =>{

        try{
            
            await _verifyEmail(code)

            return true

        }catch(error){
            throw error
        }
    }



    return(
        <FirebaseAuthContext.Provider value ={{
            user,
            signIn,
            register,
            // signInWithGoogle,
            signOut,
            verifyEmail,
            isLoggedIn,isAuthorizing}}>{children}
        </FirebaseAuthContext.Provider>
    )
}