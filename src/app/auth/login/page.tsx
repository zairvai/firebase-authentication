import {PrimaryButton, PrimaryTextButton} from "@/component/button";
import { NormalTextField } from "@/component/textfield";
import { Box, Container, CssBaseline, Divider, Grid2, Link, Stack } from "@mui/material";
import React from "react";

export default function Login(){

    return(
        <React.Fragment>
            <CssBaseline/>
            <Container maxWidth="sm">
                
                <Grid2 container sx={{
                    // border:'1px solid #333333',
                    justifyContent:"center",
                    alignItems:"center",
                    height:"100vh"
                    }}>
                    <Grid2 container sx={{
                        p:2,
                        // border:"1px solid #f00"
                        }} 
                        direction={"column"} size={"grow"} spacing={2}>

                        <Stack spacing={2}>
                            <Stack>
                                <NormalTextField label="Username/Email"/>
                            </Stack>
                            <Stack>
                                <NormalTextField label="Password" type="password"/>
                            </Stack>
                        </Stack>
                        <Stack spacing={3}>
                            <Stack direction={"row"}>
                                <Link underline="none" rel="noreferer" href="/auth/forgotpassword">Forgot Password?</Link>
                            </Stack>
                            <PrimaryButton>Sign in</PrimaryButton>
                            <Divider/>
                            <PrimaryButton href="/auth/register">Register</PrimaryButton>
                        </Stack>
                    </Grid2>
                </Grid2>
            </Container>
        </React.Fragment>
    )
}