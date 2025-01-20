'use client'

import {PrimaryButton, PrimaryTextButton} from "@/component/button";
import { NormalTextField } from "@/component/textfield";
import { Grid2, Link, Stack, Typography } from "@mui/material";
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import { useForm,Controller, FieldErrors } from "react-hook-form";
import React, { useCallback, useState } from "react";
import { useFirebaseAuth } from "@/context/FirebaseAuthContext";


type Values = {
    username:string
}

export default function ForgotPassword(){

    const auth = useFirebaseAuth()

    const [isProcessing,setProcessing] = useState<boolean>(false)
    const [isErrorMessage,setErrorMessage] = useState<string|null>(null)
    const [isSuccessful, setSuccessFul] = useState<boolean>(false)
    

    const schema = yup.object().shape({
        username:yup.string().required("Please enter email address").email("Please enter valid email address"),
    })

    const {handleSubmit,control} = useForm<Values>({
        mode:"onChange",
        resolver:yupResolver(schema),
        defaultValues:{
            username:"",
        }
    })

    const errorHandler = useCallback((errors:FieldErrors)=>{
        console.log(errors)
    },[])

    const submitHandler = useCallback(async(values:Values)=>{
        try{
            setProcessing(true)
            // console.log(values)

            await auth.sendPasswordResetEmail(values.username)

            setSuccessFul(true)

            setErrorMessage(null)
            setProcessing(false)

        }catch(error){
            setProcessing(false)
            // console.log(error)
            if(error instanceof Error){
                setErrorMessage(error.message)
            }
        }
    },[])
    

    return(
        <form onSubmit={handleSubmit(submitHandler,errorHandler)}>
            <Grid2 container direction={'column'} spacing={2}>
                 {isSuccessful ?
                <React.Fragment>
                    <Stack spacing={1}>
                        <Typography variant="h5">Reset Password Email Sent</Typography>
                        <Typography variant="caption">A reset password instruction has been sent to your email <strong>zairvai@gmail.com</strong>. Please click the link and follow the instructions.</Typography>
                    </Stack>
                    <Stack direction={"row-reverse"} spacing={3}>
                        <PrimaryTextButton href="/auth/login">back to Sign In</PrimaryTextButton>
                    </Stack>
                </React.Fragment>
                :
                <React.Fragment>
                    <Stack spacing={1}>
                        <Typography variant="h5">Forgot Password</Typography>
                        <Typography variant="caption">Enter email address registered to Firebase Authentication</Typography>
                    </Stack>
                    <Stack spacing={2}>

                        <Stack>
                            <Controller
                                control={control}
                                name="username"
                                render={
                                    ({
                                        field:{onChange,onBlur,value},
                                        fieldState:{invalid,error}
                                    })=>(
                                        <NormalTextField 
                                            label="Email address"
                                            value={value}
                                            onChange={onChange}
                                            error={error?.message?true:false}
                                            helperText={error?.message}
                                        />
                                    )
                                }
                            />
                        </Stack>
                        {isErrorMessage && 
                        <Stack>
                            <Typography variant='caption' sx={{color:"#d32f2f"}}>{isErrorMessage}</Typography>
                        </Stack>
                        }
                    </Stack>
                    <Stack direction={"row-reverse"} spacing={3}>
                        <PrimaryButton type="submit" loading={isProcessing} loadingPosition="start">Verify</PrimaryButton>
                        <PrimaryTextButton href="/auth/login">back to Sign In</PrimaryTextButton>
                    </Stack>
                </React.Fragment>
                }
            </Grid2>
        </form>
    )
}