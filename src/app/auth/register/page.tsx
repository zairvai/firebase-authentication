import {PrimaryButton, PrimaryTextButton} from "@/component/button";
import { NormalTextField } from "@/component/textfield";
import { Box, Container, CssBaseline, Grid2, Link, Stack } from "@mui/material";
import React from "react";

export default function Register(){

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
                                <NormalTextField label="Full name"/>
                            </Stack>
                            <Stack>
                                <NormalTextField label="Email address"/>
                            </Stack>
                            <Stack>
                                <NormalTextField label="Password" type="password"/>
                            </Stack>
                            <Stack>
                                <NormalTextField label="Confirm Password" type="password"/>
                            </Stack>
                        </Stack>
                        <Stack direction={"row-reverse"} spacing={3}>
                            <PrimaryButton>Register</PrimaryButton>
                            <PrimaryTextButton href="/auth/login">back to Sign In</PrimaryTextButton>
                        </Stack>
                    </Grid2>
                </Grid2>
            </Container>
        </React.Fragment>
    )
}