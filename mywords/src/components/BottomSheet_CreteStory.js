import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import SwipeableBottomSheet from "react-swipeable-bottom-sheet"
import axios from '../connections/axios'
import {story_validation,chapter_validation,storyOnclick,chapterOnClick} from "../validations/Tilte_validations"

function BottomSheet_CreteStory(props) {

    const [submited,setSubmited] = useState(false)
    const [title,setTitle] = useState("")
    const [validation,setValidation] = useState("")
    const [isStory,setIsStory] = useState(true);

    function createStory()
    {
        setValidation(storyOnclick(title));
        setIsStory(true)
        setSubmited(true);
    }

    function createChapter()
    {
        setValidation(chapterOnClick(title));
        setIsStory(false)
        setSubmited(true);
    }

    const storyInputGroupChangeHandler = (e) =>
    {
        const value = e.target.value;

        const error = story_validation(value);
            
        if(error === undefined)
        {
            error = "";
        }

        setValidation(error)
        setTitle(e.target.value)
    }

    const chapterInputGroupChangeHandler = (e) =>
    {
        const value = e.target.value;
        const error = chapter_validation(value);       
        if(error === undefined)
        {
            error = "";
        }

        setValidation(error)
        setTitle(e.target.value)
    }

    useEffect(()=>
    {
        if(submited === true)
        {
            if(validateForm(validation))
            {
                if(isStory)
                {
                    axios.post("/mywords/createstory",{
                        title: title, 
                        storytype: props.active,
                        userid:"",
                        username: ""
                    },{ headers: {"x-access-token" : localStorage.getItem('token')}})
                }
                else
                {
                    axios.post("/mywords/createchepter",{
                        title: title, 
                        content: null,
                        storyid: props.story
                    },{ headers: {"x-access-token" : localStorage.getItem('token')}})
                }
                setTitle("")
                props.setSheetVisible(!props.sheetVisible)
                
            }
        }
    },[submited])

    const validateForm = (error) => 
    {
        let valid = true;
        Object.values(error)
        .forEach((val) => val.length > 0 && (valid = false));
        return valid;
    }
    

    return (
        <SwipeableBottomSheet
        open={props.sheetVisible}
        onChange={()=>{props.setSheetVisible(!props.sheetVisible)}}
        fullScreen = {false}>
        {props.title === "create story" ?
        <Content>
            <div className='form'>
                <div className='inputfield'>
                 <input  type="text"
                 placeholder='Enter Story Title'
                 name="title"
                 id="title"
                 onChange={storyInputGroupChangeHandler}
                 />
                 <p>{validation}</p>
                 </div>
                 <button type='submit'
                 onClick={()=> createStory()}
                 > Create Story </button>
            </div>
            
        </Content>
        
        : props.title === "create chapters" && 
            <Content>
            <div className='form'>
                <div className='inputfield'>
                 <input  type="text"
                 placeholder='Enter chapters title'
                 name="title"
                 id="title"
                 onChange={chapterInputGroupChangeHandler}
                 />
                 <p>{validation}</p>
                 </div>
                 <button type='submit'
                 onClick={()=> createChapter()}
                 > Create Chapter </button>
            </div>
            </Content>
        }
    
    </SwipeableBottomSheet>
    )
}

export default BottomSheet_CreteStory

const Content = styled.div`
display: flex;
height: 150px;
align-items: center;

.form{
    flex:1;
    display: flex;
    justify-content: space-between;

}

.inputfield
{
    flex:1;
    display: flex;
    flex-direction: column;
    margin-left: 50px ;

    p{
        padding: 10px 0;
        height: 10px;
        color: red;
    }
}

input{
    flex: 1;
    height: 40px; 
    padding: 10px 30px;
    border: 2px solid gray;
}

button{
    margin: 0 50px;
    padding: 0 30px;
    height: 40px;
    background: lightblue;
    outline: none;
    border: 2px solid gray;
    border-radius: 30px;
}
`