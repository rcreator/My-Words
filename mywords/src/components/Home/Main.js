import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { Button } from "@material-ui/core"
import axios from '../../connections/axios';
import BottomSheet_CreteStory from '../BottomSheet_CreteStory';
import Writestory from './Writestory';
import { loadStory} from "../../Actions/index"

function Main({setStory,setStorytitle,setView,view,story,active,storytitle,stories}) {

    const [sheetVisible, setSheetVisible] = useState(false);


    const storyload = (e) => {
        setStory(e.currentTarget.id);
        setStorytitle(e.currentTarget.dataset.tag);
        setView("TextArea");    
    }
    
    return (
        <Container>
            <img calssName="spiner" src="../images/loader.gif" />
            {view === "TextArea" 
            ? <Writestory 
            story = {story}
            setView = {(item)=> setView(item)}
            storytitle = {storytitle}
            />
            : view === "Grid" &&
            <> 
            <Header>
                <h2>{active === "Personal" ? "Your Personal Stories" : " Your General Stories"}</h2>
                <button onClick={()=>setSheetVisible(true)}>
                    Create New Story
                </button>
            </Header>
            <StoryGrid>
            {stories.length === 0 ? <p>No Stories Found</p>: ("")}
                {stories.map((stories)=>
                     (<List id={stories._id} data-tag={stories.title} key={stories._id} onClick={storyload}>  
                        <Button>
                            <h3><span>{stories.title}</span></h3>
                            <ArrowRightAltIcon />
                        </Button>    
                    </List>) 
                )}
                
                
            </StoryGrid>
            </>}
            <BottomSheet_CreteStory 
            title = "create story"
            active= {active}
            setSheetVisible = {(item)=>{ setSheetVisible(item)}}
            sheetVisible = {sheetVisible}
            />
        </Container>
    )
}

export default Main


const Container = styled.div`
img {
    width: 60px;
    position: absolute;
    z-index: 10000;
    top:50%;
    left: 50%;
}
`

const Header = styled.div`
display: flex;
justify-content: space-between;
padding: 20px;
border-bottom: 2px solid gray;
button
{
    padding: 5px 20px;
    border-radius: 30px;
    outline: none;
    background: lightblue;
    border: 2px solid gray;
}
`

const StoryGrid = styled.div`
display: flex;
flex-direction: column;

p
{
    display: flex;
    justify-content: center;
    padding: 20px;
}

`
const List = styled.div`
display: flex;
margin: 10px;
background: lightgreen;
border-radius: 30px;
align-items: center;

button{
flex : 1;
display: flex;
justify-content: space-between;
border-radius: 30px;
padding: 10px 30px;
}
`