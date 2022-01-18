import React, { useState, useEffect } from 'react'
import  {signup_validation,validationdisplay} from "../../validations/V_SignUp"
import axios from '../../connections/axios';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()


const Signup_f = () =>{
    
    const [submited,setSubmited] = useState(false)
    const [userCreated,setUserCreated] = useState(false) 
    const [userData, setUserData] = useState
        ({
            username: "",
            email: "",
            password: "",
            authSource: 2,
        })
    const [validation,setValidation] = useState({
        username: "",
        email: "",
        password: ""
    })

    useEffect(()=>
        {
            if(submited === true)
            {
                if(validateForm(validation))
                {  
                    axios.post("/mywords/newUser",{
                        username:userData.username,
                        email: userData.email,
                        password: userData.password,
                        authSource:userData.authSource
                    })
                    .then(response => toast.success(response.data,
                    {position: toast.POSITION.BOTTOM_RIGHT}))
                    .catch(err => toast.warning("Something went wrong",
                        {position: toast.POSITION.BOTTOM_RIGHT}))
                    setUserCreated(true);
                }
                setSubmited(false);
            }
            
        },[validation,submited])
        
    const inputGroupChangeHandler = (e) =>
        {
            const { name, value } = e.target;
            const error = signup_validation(name,value);
            
            if(error[name] === undefined)
            {
                error[name] = "";
            }
            
            setValidation
            (
                (prevState) =>
                ({
                    ...prevState,
                    [e.target.id]: error[name]
                })
            )
            
            setUserData((prevState) => 
            ({
                ...prevState,
                [e.target.id]: e.target.value
            }));                   
        }
    
    const createUser = (e) =>
    {
         e.preventDefault();
         setValidation(validationdisplay(userData));
         setSubmited(true);

    }    
    const validateForm = (error) => 
    {
        let valid = true;
        Object.values(error)
        .forEach((val) => val.length > 0 && (valid = false));
        return valid;
    }

    return {createUser,inputGroupChangeHandler,userData,validation,userCreated}
}


export default Signup_f;