import React,{useState,useEffect} from 'react'
import styled from 'styled-components'
import Header from './Header'
import { useNavigate} from "react-router-dom"
import { connect } from "react-redux"
import  {signin_validation, validationsignin} from "../validations/V_SignUp"
import { signInManual } from "../Actions/index"
import axios from '../connections/axios'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()


function Login(props) {
    
    const navigate = useNavigate()
    const [respose,setResponse] = useState('');
    const [submited,setSubmited] = useState(false)
    const [userData, setUserData] = useState
        ({
            userid: "",
            password: ""
        })
    const [validation,setValidation] = useState({
        userid: "",
        password: ""
    })

    useEffect(()=>
        {
            if(submited === true)
            {
                if(validateForm(validation))
                {  
                    axios.post("/mywords/verifyuser",{
                        userid: userData.userid,
                        password: userData.password
                    }).then(response =>
                        {
                            if(!response.data)
                            {
                                setResponse("Username or Password is invalid")
                            }
                            else{
                                
                                    toast.success(response.data['message'],
                                    {position: toast.POSITION.BOTTOM_RIGHT})
                                    localStorage.setItem('token',response.data['token'])
                                    navigate('/home')      
                            }
                        }).catch((err)=>
                        {
                            toast.error(err.response.data.message,
                            {position: toast.POSITION.BOTTOM_RIGHT})

                        })
                }
                setSubmited(false);
            }
            
        },[submited])

        useEffect(()=>{
            if(localStorage.getItem('token') != null)
            {
                navigate('/home')
            }
        },[])


    const inputGroupChangeHandler = (e) =>
        {
            const { name, value } = e.target;
            const error = signin_validation(name,value);
            
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
             setValidation(validationsignin(userData));
             setSubmited(true);
        }  

        const validateForm = (error) => 
            {
                let valid = true;
                Object.values(error)
                .forEach((val) => val.length > 0 && (valid = false));
                return valid;
            }


    return (
        
        <Container>
        <Header />
         <Content>
            <SignUPBox>
                <form>
                    <Inputs>
                        <label>User ID</label>
                        <input 
                        type="text"
                        placeholder='Enter Username / Email'
                        name="userid"
                        id='userid'
                        onChange={inputGroupChangeHandler}
                        ></input>
                        <p>{validation.userid}</p>
                    </Inputs>
                    
                    <Inputs>
                    <label>Password</label>
                    <input
                    type="Password"
                    placeholder='Enter Password'
                    name="password"
                    id='password'
                    onChange={inputGroupChangeHandler}
                    ></input>
                    <p>{validation.password}</p>
                    </Inputs>
                    <button
                    type='submit'
                    onClick={createUser}>
                        Sign In
                    </button>
                </form>
                <p>
                    {respose}
                </p>
                <SocialAuth>
                    <button>
                        <img src="/images/icons8-google-144.png"/>
                        Google
                    </button>
                    <button>
                        <img src="images/icons8-facebook-144.png" />    
                        Facebook
                    </button>
                </SocialAuth>
            </SignUPBox>       
        </Content>         
        </Container>
        
        
    )
}


const Container = styled.div`
`

const SignUPBox = styled.div`
max-width: 500px;
width: 100%;
padding: 10px;
position: relative;
display: flex;
flex-direction: column;
justify-content: center;
background: white;
height: fit-content;
border-radius: 0px  0px 30px 30px;
box-shadow: 5px 5px #888888;

form
{
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    width: 100%;

    button{
        width: 100%;
        padding:7px 4px;
        border-radius: 10px;
        border: none;
        letter-spacing: 1.5px;
        font-weight: 600;
        margin: 14px 0;
        background: lightblue;
        font-size: 16px;
        cursor: pointer;

        &:hover{
            opacity: 0.8;
        }

    }
}
`
const Inputs = styled.div`
display: flex;
flex-direction: column;
position: relative;
height: 60px;
width: 100%;
margin: 10px 0;

label{
    position: absolute;
    left:20px;
    top:-7px;
    background: white;
    padding: 0 7px;
    border-radius: 20px
}
input{
    padding: 20px;
    width: 100%; 
    border-radius: 30px;
    outline: none;
    border: 1px solid gray;
    height: 35px;
}
p{
    color: red;
    display: flex;
    justify-content: start;
    margin: 5px 20px;
}

`


const Content = styled.div`
background: url('images/1.jpg');
background-position: center;
background-repeat: no-repeat;
background-size: cover;
display: flex;
height: calc(100vh - 60px);
justify-content: end;
`

const SocialAuth = styled.div`
display: flex;


button{
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    padding: 7px 0;
    margin: 10px;
    letter-spacing: 2px;
    font-size: 16px;
    border: solid 2px black;
    border-radius: 30px;
    font-weight: 600;
    background: none;
    line-height: 1.2;
    cursor: pointer;
  
    img {
        width: 25px;
        margin: 0 10px;

    }

    &:hover{
        background: rgba(0,0,0,0.1);
        border: rgba(0,0,0,0.4) 2px solid;
    }
}

`

const mapStateProps = (state) =>
{
    return{
        user: state.userState.user
    };
}

const mapDispatchToProps = (dispatch) =>({
    signInManual: (payload) => dispatch(signInManual(payload))

})


export default connect(mapStateProps, mapDispatchToProps)(Login)
