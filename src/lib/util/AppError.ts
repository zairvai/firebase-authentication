export class AuthError extends Error {
    constructor(message:string){
        super(message)
        this.name = "AuthError"
    }
}

export class FormError extends Error {

    field:any;

    constructor(field:any,message:string){
        super(message)
        this.field = field
        this.name = "FormError"
    }
}

