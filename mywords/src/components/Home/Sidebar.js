import React from 'react'
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import styled from 'styled-components';



function Sidebar(props) {

    
    return (
        <Container>
            <button className={ props.active === "Personal" ? "nav_button active" : "nav_button"}
            onClick={() => props.setActive("Personal")}>
                Personal Stories
                {props.active === "Personal" ? <ArrowRightAltIcon /> : ""}
            </button>
            <button className={ props.active === "General" ? "nav_button active" : "nav_button"}
            onClick={() => props.setActive("General")}>
                General Stories
                {props.active === "General" ? <ArrowRightAltIcon /> : ""}
            </button>
        </Container>
    )
}

export default Sidebar


const Container = styled.div`
display: flex;
flex-direction: column;
background: rgba(0,0,0,0.9);
height: calc(100vh - 60px);

.nav_button {
    display: flex;
    height: 45px;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    font-weight: 600;
    background: transparent;
    border:none;
    outline: none;
    color: white;    
}

.active{
    background-color: white;
    color: black;
}

`
