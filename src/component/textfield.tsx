import MUITextField,{TextFieldProps as MUITextFieldProps}from '@mui/material/TextField'

type TextFieldProps  = MUITextFieldProps

function TextField(props:TextFieldProps){

    return(
        <MUITextField {...props}/>
    )
}

export function NormalTextField(props:Omit<TextFieldProps,"size">){

    return (
        <TextField size="small" {...props}/>
    )
}
