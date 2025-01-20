'use client'

import { PrimaryButton } from "@/component/button";
import { useFirebaseAuth } from "@/context/FirebaseAuthContext";
import { Grid2, Stack, Typography } from "@mui/material";

export default function Dashboard(){

    const auth = useFirebaseAuth()

    return(
        <Grid2 container direction={'column'} spacing={2}>

            <Stack spacing={1}>
                <Typography variant="h5">Authenticated</Typography>
                <Typography variant="caption">You are authenticated : <strong>{auth.user?.email}</strong></Typography>
            </Stack>

            <Stack>
                <PrimaryButton fullWidth onClick={()=>auth.signOut()}>Sign out</PrimaryButton>
            </Stack>
        </Grid2>
    )
}