import { Container, CssBaseline, Grid2 } from '@mui/material'
import React from 'react'

export default function AuthLayout({
    children
}:{
    children:React.ReactNode
}){

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
                            p:{xs:2,md:5,lg:10},
                            // border:"1px solid #f00"
                            }} 
                            direction={"column"} 
                            size={"grow"}>
                                {children}
                        </Grid2>
                </Grid2>
            </Container>
        </React.Fragment>
    )
}