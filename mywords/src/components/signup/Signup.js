import React, { useState,useEffect } from 'react'
import Header from '../Header'
import styled from 'styled-components'
import { connect } from "react-redux"
import { signInSocialAPI,signUpManual } from "../../Actions/index"
import { Navigate} from "react-router-dom"
import useform from "./SignUp_F"


function Signup(props) {

    
    const {createUser,inputGroupChangeHandler,userData,validation,userCreated} = useform();

    return (
        <Container>
            {
             userCreated && <Navigate to ="/login" />
            }
        <Header />
         <Content>
            <SignUPBox>
                <form>
                    <Inputs>
                        <label>Username</label>
                        <input 
                        type="text"
                        placeholder='Enter Username'
                        name="username"
                        id='username'
                        onChange={inputGroupChangeHandler}
                        ></input>
                        <p>{validation.username}</p>
                    </Inputs>
                    
                    <Inputs>
                        <label>Email</label>
                        <input
                        type="text"
                        placeholder='Enter Email'
                        name="email"
                        id='email'
                        onChange={inputGroupChangeHandler} 
                        ></input>
                        <p>{validation.email}</p>
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
                        Sign Up
                    </button>

                </form>
                <SocialAuth>
                    <button onClick={()=> props.signUp()}>
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
    signUp : () => dispatch(signInSocialAPI()),
    signUpManual: (payload) => dispatch(signUpManual(payload))
})


export default connect(mapStateProps, mapDispatchToProps)(Signup)