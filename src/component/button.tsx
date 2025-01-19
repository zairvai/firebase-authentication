import * as React from 'react'
import MUIButton,{ButtonProps as MUIButtonProps} from '@mui/material/Button'

type ButtonProps = MUIButtonProps

function Button({
    color="primary",
    variant="contained",
    href,
    children,
    ...props
}:ButtonProps){
    return (
        <MUIButton color={color} href={href} variant={variant} {...props}>
            {children}
        </MUIButton>
    )
}

export function PrimaryButton({
    children,
    href
}:{
    children:React.ReactNode
    href?:string
}){

    return(
        <Button href={href} color="primary" variant='contained'>{children}</Button>
    )
}

export function PrimaryOutlinedButton({
    children,
    href
}:{
    children:React.ReactNode
    href?:string
}){

    return(
        <Button href={href} color="primary" variant="outlined">{children}</Button>
    )
}

export function PrimaryTextButton({
    children,
    href
}:{
    children:React.ReactNode
    href?:string
}){

    return(
        <Button href={href} color="primary" variant="text">{children}</Button>
    )
}

export default Button
