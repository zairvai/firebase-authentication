import {PrimaryButton, PrimaryTextButton} from "@/component/button";
import { NormalTextField } from "@/component/textfield";
import { Box, Container, CssBaseline, Divider, Grid2, Link, Stack } from "@mui/material";
import React from "react";

export default function ForgotPassword(){

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
                        </Stack>
                        <Stack direction={"row-reverse"} spacing={3}>
                            <PrimaryButton>Verify</PrimaryButton>
                            <PrimaryTextButton href="/auth/login">back to Sign In</PrimaryTextButton>
                        </Stack>
                    </Grid2>
                </Grid2>
            </Container>
        </React.Fragment>
    )
}