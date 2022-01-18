import React from 'react'
import styled from 'styled-components'
import {Link} from "react-router-dom"
import { connect } from "react-redux"
import {useNavigate} from "react-router-dom"
import {Avatar} from "@material-ui/core"
import Dropdown from "./Dropdown"

function Header(props) {

    const navigate = useNavigate()
    function signOutAPI()
    {
        localStorage.removeItem('token');
        navigate("/login")
    }

    return (
        <Container>
                <ActionButton>
                    {props.verified 
                    ?  
                        <>  <Logo>
                                My Logo
                            </Logo>
                            <Explore>
                                <p>Explore</p>
                                <Dropdown />
                            </Explore>
                            <Avatar>
                                
                            </Avatar>
                            <button onClick={signOutAPI}>
                                Sign Out
                            </button> 
                        </>  
                    :
                        <>               
                            <Link to="/login">
                            <button className='SignIn_button'>Sign In</button>
                            </Link>
                            <Link to="/signup">
                            <button className='SignUp_button'>Sign Up</button>
                            </Link>
                        </>
}
                   
                </ActionButton>    
        </Container>
    )
}


const Container = styled.div`
height: 60px;
width: 100%;
background-color: transparent;
border-bottom: rgba(0,0,0,0.6) solid 1px;
display: flex;
align-items: center;
`

const ActionButton = styled.div`
display: flex;
width: 100%;
justify-content: space-between;
align-items: center;

a{
    text-decoration: none;
}

button{
    padding: 7px 13px;
    margin: 10px;
    outline: none;
    background: none;
    border-radius: 7px;
    border: none;
    letter-spacing: 1.5px;
    background-color: rgba(0,0,0,0.6);
    color: white;
    cursor: pointer;

    &:hover{
        background-color: rgba(0,0,0,0.8);
    }    
}

div{
    padding: 10px;
}


`


const Explore = styled.div`
    display: flex;
    flex: 1;
    align-items: center;
    p
    {
        padding: 10px;
    }

`

const Logo = styled.div`
    display: flex;
    flex: 0.27;
    justify-content: start;
    align-items: center;
    padding: 20px;
    width: 300px;

`



const mapStateProps = (state) =>
{
    return{
        user: state.userState.user
    };
}


export default connect(mapStateProps)(Header)