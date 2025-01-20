'use client'

import {PrimaryButton, PrimaryTextButton} from "@/component/button";
import { NormalTextField } from "@/component/textfield";
import { Grid2, Link, Stack } from "@mui/material";
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import { useForm,Controller, FieldErrors } from "react-hook-form";
import React, { useCallback, useState } from "react";
import { firebaseRegister } from "@/lib/firebase/auth";

type Values = {
    fullname:string
    username:string
    password1:string
    password2:string
}

export default function Register(){

    const [isProcessing,setProcessing] = useState<boolean>(false)
    const schema = yup.object().shape({
        fullname:yup.string().required("Please enter your fullname").min(5,"Minimum 5 characters"),
        username:yup.string().required("Please enter email address").email("Please enter valid email address"),
        password1:yup.string().required("Please type in your password"),
        password2:yup.string().required("Please confirm your password").oneOf([yup.ref("password1")],"Confirm password is not equal to your password")
    })

    const {handleSubmit,control} = useForm<Values>({
        mode:"onChange",
        resolver:yupResolver(schema),
        defaultValues:{
            fullname:"",
            username:"",
            password1:"",
            password2:""
        }
    })

    const errorHandler = useCallback((errors:FieldErrors)=>{
        console.log(errors)
    },[])

    const submitHandler = useCallback(async(values:Values)=>{
        setProcessing(true)
        console.log(values)

        await firebaseRegister(values.username,values.password1)

        setProcessing(false)
    },[])

    return(
        <form onSubmit={handleSubmit(submitHandler,errorHandler)}>
            <Grid2 container direction={'column'} spacing={2}>
                            
                <Stack spacing={2}>
                    <Stack>
                        <Controller
                            control={control}
                            name="fullname"
                            render={
                                ({
                                    field:{onChange,onBlur,value},
                                    fieldState:{invalid,error}
                                })=>(
                                    <NormalTextField 
                                        label="Full name"
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
                    <Stack>
                        <Controller
                            control={control}
                            name="password1"
                            render={
                                ({
                                    field:{onChange,onBlur,value},
                                    fieldState:{invalid,error}
                                })=>(
                                    <NormalTextField 
                                        type="password"
                                        label="Password"
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
                            name="password2"
                            render={
                                ({
                                    field:{onChange,onBlur,value},
                                    fieldState:{invalid,error}
                                })=>(
                                    <NormalTextField 
                                        type="password"
                                        label="Confirm Password"
                                        value={value}
                                        onChange={onChange}
                                        error={error?.message?true:false}
                                        helperText={error?.message}
                                    />
                                )
                            }
                        />
                    </Stack>
                </Stack>
                <Stack direction={"row-reverse"} spacing={3}>
                    <PrimaryButton type="submit" loading={isProcessing} loadingPosition="start">Register</PrimaryButton>
                    <PrimaryTextButton href="/auth/login">back to Sign In</PrimaryTextButton>
                </Stack>
            </Grid2>
        </form>
    )
}