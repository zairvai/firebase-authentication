'use client'

import {PrimaryButton, PrimaryTextButton} from "@/component/button";
import { NormalTextField } from "@/component/textfield";
import { Grid2, Link, Stack } from "@mui/material";
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import { useForm,Controller, FieldErrors } from "react-hook-form";
import React, { useCallback, useState } from "react";


type Values = {
    username:string
}

export default function ForgotPassword(){

    const [isProcessing,setProcessing] = useState<boolean>(false)
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
            setProcessing(true)
            console.log(values)
        },[])
    

    return(
        <form onSubmit={handleSubmit(submitHandler,errorHandler)}>
            <Grid2 container direction={'column'} spacing={2}>

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
                </Stack>
                <Stack direction={"row-reverse"} spacing={3}>
                    <PrimaryButton type="submit" loading={isProcessing} loadingPosition="start">Verify</PrimaryButton>
                    <PrimaryTextButton href="/auth/login">back to Sign In</PrimaryTextButton>
                </Stack>
            </Grid2>
        </form>
    )
}