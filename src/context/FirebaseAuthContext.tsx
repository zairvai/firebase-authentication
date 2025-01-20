'use client'

import { User } from "firebase/auth";
import { SignInWithEmailProps, SignUpWithEmailProps } from "@/lib/auth/type";
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { _createUserWithEmailAndPassword, _onAuthStateChanged, _sendPasswordResetEmail, _signInWithEmailAndPassword, _signOut, _verifyEmail } from "@/lib/firebase/auth";
import { redirect, usePathname } from "next/navigation";
import { authPathnames } from "@/global.config";

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

    const [user,setUser] = useState<User|null>(null)
    const [isAuthorizing,setAuthorizing] = useState<boolean>(false)
    const [isLoggedIn,setLoggedIn] = useState<boolean>(false)


    useEffect(()=>{
        setAuthorizing(true)

        const unsubscribe = _onAuthStateChanged(async (authUser)=>{
            // console.log(authUser)
            if(authUser){
                setUser(authUser)
                setLoggedIn(true)
                redirect("/dashboard")
            }
            else{
                setUser(null)
                setLoggedIn(false)
                if(fallbackUrl){
                    
                    if(!authPathnames.find(elm=>elm===pathname)){
                        redirect("/auth")
                    }
                    
                }
            }

            setAuthorizing(false)
        })

        return ()=>unsubscribe()
    },[])

    useEffect(()=>{
        console.log(user)
    },[user])

    const signIn = useCallback(async (username:string,password:string)=>{

        try{

            setAuthorizing(true)
            await _signInWithEmailAndPassword(username,password)
            
        }catch(error){
            throw error
        }finally{
            setAuthorizing(false)
        }

    },[])

    const register = useCallback(async(props:SignUpWithEmailProps)=>{

        try{

            await _createUserWithEmailAndPassword(props.username,props.password)

        }catch(error){
            throw error
        }

    },[])

    const signOut = useCallback(async()=>{
        
        try{

            setAuthorizing(true)
            await _signOut()
            
            // setUser(null)
            // setLoggedIn(false)

        }catch(error){
            throw error
        }
    },[])

    return(
        <FirebaseAuthContext.Provider value ={{
            user,
            signIn,
            register,
            // signInWithGoogle,
            signOut,
            verifyEmail:_verifyEmail,
            sendPasswordResetEmail:_sendPasswordResetEmail,
            isLoggedIn,isAuthorizing}}>{children}
        </FirebaseAuthContext.Provider>
    )
}