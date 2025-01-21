# integrating NextJS App Router with Firebase Authentication

- live demo [https://main.d26jlw48c5yifc.amplifyapp.com/auth/login]

## 1. create project

$: npx create-next-app@latest 

what is your project named: firebase-authentication

>. ✔ What is your project named? … firebase-authentication
>. ✔ Would you like to use TypeScript? … No / Yes => Yes
>. ✔ Would you like to use ESLint? … No / Yes => No
>. ✔ Would you like to use Tailwind CSS? … No / Yes  => No
>. ✔ Would you like your code inside a `src/` directory? … No / Yes  => Yes
>. ✔ Would you like to use App Router? (recommended) … No / Yes => Yes
>. ✔ Would you like to use Turbopack for `next dev`? … No / Yes => Yes
>. ✔ Would you like to customize the import alias (`@/*` by default)? … No / Yes => No

## 2. install firebase
    npm install firebase or yarn add firebase

## 3. Login to console and activate authentication [https://console.firebase.google.com]
- Before you start you have to create new project.
- After the project is created, copy the configuration generated upon creating and save it to .env local files 
    [https://github.com/zairvai/firebase-authentication/blob/main/src/lib/firebase/config.ts]


### - activate sign-up method "Email/Password"
- I wrote all the firebase authentication implementation in /src/lib/firebase/auth.ts
- Integrate to NextJs via Context in /src/context/FirebaseAuthContext.ts

### Code

    - Sign up with Email

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

    - Sign in with Email

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


    - Sign out

    const _signOut = useCallback(async()=>{
        
        try{

            await signOut(auth)

        }catch(error){
            throw error
        }
    },[])

    - Listen to authentication status

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


### - activate sign-up method "Google" in firebase console

- first activate 'google' sign in method in firebase console
- go to your google cloud console credentials [https://console.cloud.google.com/apis/credentials]
- under OAuth 2.0 Client IDs click web client created by google service
- under authorized redirect uri add your url eg; https://localhost:3000/__/auth/handler
!(images/google_redirect.png)

### Code

- Sign in with google 

    const _signInWithGoogle = useCallback(async()=>{
        try{
            setAuthorizing(true)

            //await setPersistence(auth, inMemoryPersistence)
            const provider = new GoogleAuthProvider()
            // provider.addScope("https://www.googleapis.com/auth/contacts.readonly")
            provider.addScope("profile")
            provider.addScope("email")

            signInWithRedirect(auth,provider)

        }catch(error:any){
            throw error
        }

    },[])

- getRedirect (this will handle response from google)

    const _getRedirectResult = useCallback(async ()=>{
        try{
            setAuthorizing(true)

            const credential = await getRedirectResult(auth)
            
        }catch(error){
            console.log(error)
        }finally{
            setAuthorizing(false)
        }

    },[])

-- add listener in login page 

    useEffect(()=>{
        //get redirect result when sign in using third party like google, fb
        auth.getRedirectResult()
    },[])
