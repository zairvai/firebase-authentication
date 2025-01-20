import React from 'react'
import { ReactNode } from "react"
import {site} from '@/global.config'

export const metadata = {
    title: `${site.title} | Register`
}

export default function Layout({children}:{children:ReactNode}){

    return(
        <React.Fragment>{children}</React.Fragment>
    )
}