import validation from "./validations"

export const signup_validation = (name, value) =>
{
    let error= {};
    const validEmailRegex =  RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
    switch (name)
    {
        case "username":
            if(!value || value === "")
            {
                error.username = validation.username_Required;
            }
            else if(value.length > 30)
            {
                error.username = validation.Maxlentgth;
            }
            break
        case "email":
            if(!value || value === "")
            {
                error.email = validation.email_Required;
            }
            else if(!validEmailRegex.test(value))
            {
                error.email = validation.email_Invalid;
            }
            break
        case "password":
            if(!value || value === "")
            {
                error.password = validation.password_Required;
            }
            else if(value.length < 8)
            {
                error.password = validation.password_Minlength;
            }
            break
        
        default:
            break
    }
    
    return error;
}

export function validationdisplay(userdata)
{
            let error = {}
            const validEmailRegex =  RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
            if(!userdata.username || userdata.username === "")
            {
                error.username = validation.username_Required;
            }
            else if(userdata.username.length > 30)
            {
                error.username = validation.Maxlentgth;
            }


            if(!userdata.email || userdata.email === "")
            {
                error.email = validation.email_Required;
            }
            else if(!validEmailRegex.test(userdata.email))
            {
                error.email = validation.email_Invalid;
            }

            if(!userdata.password || userdata.password === "")
            {
                error.password = validation.password_Required;
            }
            else if(userdata.password.length < 8)
            {
                error.password = validation.password_Minlength;
            }
    return error;
}


export const signin_validation = (name, value) =>
{
    let error= {};
    switch (name)
    {
        case "userid":
            if(!value || value === "")
            {
                error.userid = validation.username_Required;
            }
            break
        case "password":
            if(!value || value === "")
            {
                error.password = validation.password_Required;
            }
            break
        
        default:
            break
    }
    
    return error;
}


export function validationsignin(userdata)
{
            let error = {}
            if(!userdata.userid || userdata.userid === "")
            {
                error.userid = validation.username_Required;
            }
            if(!userdata.password || userdata.password === "")
            {
                error.password = validation.password_Required;
            }
    return error;
}