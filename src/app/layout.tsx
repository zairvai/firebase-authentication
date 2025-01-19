import React from "react";
import {AppRouterCacheProvider} from '@mui/material-nextjs/v15-appRouter'
import {Roboto} from 'next/font/google'
import {ThemeProvider} from '@mui/material/styles'
import {theme} from '@/theme'

const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-roboto',
});
    
export default function RootLayout({
    children
}:Readonly<{
    children:React.ReactNode
}>){

    return(
        <html lang="en">
            <body className={roboto.variable}>
                <AppRouterCacheProvider>
                    <ThemeProvider theme={theme}>
                        {children}
                    </ThemeProvider>
                </AppRouterCacheProvider>
            </body>
        </html>
    )
}