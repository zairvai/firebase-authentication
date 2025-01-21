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
        <MUIButton type='submit' color={color} href={href} variant={variant} {...props}>
            {children}
        </MUIButton>
    )
}

export function PrimaryButton({
    children,
    href,
    color="primary",
    ...props
}:Omit<ButtonProps,"variant">){

    return(
        <Button href={href} color={color} variant='contained' {...props} >{children}</Button>
    )
}

export function PrimaryOutlinedButton({
    children,
    href,
    ...props
}:Omit<ButtonProps,"color"|"variant">){

    return(
        <Button href={href} color="primary" variant="outlined" {...props}>{children}</Button>
    )
}

export function PrimaryTextButton({
    children,
    href,
    ...props
}:Omit<ButtonProps,"color"|"variant">){

    return(
        <Button href={href} color="primary" variant="text" {...props} >{children}</Button>
    )
}


export function RedButton({
    children,
    href,
    ...props
}:Omit<ButtonProps,"variant">){

    return(
        <Button href={href} sx={{background:"#fc034e"}} variant='contained' {...props} >{children}</Button>
    )
}

