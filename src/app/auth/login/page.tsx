'use client'

import {PrimaryButton} from "@/component/button";
import { NormalTextField } from "@/component/textfield";
import { Divider, Grid2, Link, Stack, Typography } from "@mui/material";
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import { useForm,Controller, FieldErrors } from "react-hook-form";
import React, { useCallback, useState } from "react";
import { useFirebaseAuth } from "@/context/FirebaseAuthContext";

type Values = {
    username:string
    password:string
}

export default function Login(){

    const auth = useFirebaseAuth()

    const [isProcessing,setProcessing] = useState<boolean>(false)
    const [isErrorMessage,setErrorMessage] = useState<string|null>(null)

    const schema = yup.object().shape({
        username:yup.string().required("Please enter email address").email("Please enter valid email address"),
        password:yup.string().required("Please type in your password")
    })

    const {handleSubmit,control} = useForm<Values>({
        mode:"onChange",
        resolver:yupResolver(schema),
        defaultValues:{
            username:"",
            password:""
        }
    })

    const errorHandler = useCallback((errors:FieldErrors)=>{
        console.log(errors)
    },[])

    const submitHandler = useCallback(async(values:Values)=>{

        try{
            setProcessing(true)
            console.log(values)

            await auth.signIn(values.username,values.password)
            setErrorMessage(null)
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
               
            
            <Stack spacing={1}>
                <Typography variant="h5">Login</Typography>
                <Typography variant="caption">Login via email account registered to Firebase Authentication</Typography>
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
                                    label="Username/Email"
                                    value={value}
                                    onChange={onChange}
                                    error={error?.message?true:false}
                                    helperText={error?.message}
                                />
                            )
                        }
                    />
                    
                </Stack>
                <Stack>
                    <Controller
                        control={control}
                        name="password"
                        render={
                            ({
                                field:{onChange,onBlur,value},
                                fieldState:{invalid,error}
                            })=>(
                                <NormalTextField 
                                    label="Password" 
                                    type="password"
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
            <Stack spacing={3}>
                <Stack direction={"row"}>
                    <Link underline="none" rel="noreferer" href="/auth/forgotpassword">Forgot Password?</Link>
                </Stack>
                <PrimaryButton fullWidth type="submit" loading={isProcessing} loadingPosition="start" >Sign in</PrimaryButton>
                <Divider/>
                <PrimaryButton disabled={isProcessing} href="/auth/register">Register</PrimaryButton>
            </Stack>
            
                
            </Grid2>
        </form>
                       
    )
}