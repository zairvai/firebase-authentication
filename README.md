# integrating NextJS App Router with Firebase Authentication

- live demo [https://main.d26jlw48c5yifc.amplifyapp.com/auth/login]

## 1. create project

$: npx create-next-app@latest 

what is your project named: firebase-authentication

- ✔ What is your project named? … firebase-authentication
- ✔ Would you like to use TypeScript? … No / Yes => Yes
- ✔ Would you like to use ESLint? … No / Yes => No
- ✔ Would you like to use Tailwind CSS? … No / Yes  => No
- ✔ Would you like your code inside a `src/` directory? … No / Yes  => Yes
- ✔ Would you like to use App Router? (recommended) … No / Yes => Yes
- ✔ Would you like to use Turbopack for `next dev`? … No / Yes => Yes
- ✔ Would you like to customize the import alias (`@/*` by default)? … No / Yes => No

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

    - Sign Up with Email

    const register = useCallback(async(props:SignUpWithEmailProps)=>{

        try{

            await _createUserWithEmailAndPassword(props.username,props.password)

        }catch(error){
            throw error
        }

    },[])

    - Sign In with Email

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


    - Sign out

    const signOut = useCallback(async()=>{
        
        try{

            setAuthorizing(true)
            await _signOut()

        }catch(error){
            throw error
        }
    },[])