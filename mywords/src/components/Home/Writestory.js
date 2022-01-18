
import React, { useState,useEffect } from 'react'
import styled from 'styled-components'
import axios from '../../connections/axios'
import BottomSheet_CreteStory from '../BottomSheet_CreteStory'

function Writestory(props) {

    const [chepter,setChepter] = useState([])
    const [sheetVisible, setSheetVisible] = useState(false);
    const [input,setInput] = useState("");
    const [chapterid,setChapterid] = useState("")

    const loadchapter = (e) =>
    {   
    
        setChapterid(e.currentTarget.id)
        
        //e.currentTarget.className = "chapter active"
    }


    useEffect(()=>{
        console.log(chapterid);
        content();
    },[chapterid])


    useEffect(()=>{
        axios.post("/mywords/chepters",
        {
            storyid: props.story
        },{ headers: {"x-access-token" : localStorage.getItem('token')}})
        .then( response =>
          {
            setChepter(response.data)
            
          });
    },[])

    const saveContent = () =>
    {
        axios.put("/mywords/updatechapter",
        {
            id: chapterid,
            content: input
        },{ headers: {"x-access-token" : localStorage.getItem('token')}})
        .then( response =>
          {
            console.log(response.data)
            
          });
    }
    

    const content = () =>{
        axios.get(`/mywords/chepters/${chapterid}`,{ headers: {"x-access-token" : localStorage.getItem('token')}})
        .then( response =>
          {
            setInput(response.data)         
          });

    }


    return (
        <Container>
            <Header>
                <h4> {props.storytitle}</h4>
                <Chepaters>
                {chepter.map((chepter)=>  
                    (<p key={chepter._id} id={chepter._id} onClick={loadchapter} className= "chapter">  
                        {chepter.title}       
                    </p>))
                }
                    
                </Chepaters>
                <Actions>
                    <button onClick={()=>setSheetVisible(true)}>
                        Create New Chapter
                    </button>
                    <button  onClick={saveContent} >
                        Save
                    </button>
                    <button onClick={()=> props.setView("Grid")}>
                        Close
                    </button>
                </Actions>
            </Header>
            <Content>
                <textarea value ={input} onChange={(e) => setInput(e.target.value)}/>
            </Content>

            <BottomSheet_CreteStory
            title = "create chapters"
            story= {props.story}
            setSheetVisible = {(item)=>{ setSheetVisible(item)}}
            sheetVisible = {sheetVisible}
            />

        </Container>
    )
}

export default Writestory

const Container = styled.div`
display: flex;
padding: 10px;
flex: 1;
`
const Header = styled.div`
display: flex;
flex-direction:column;
width: 250px;
height: calc( 100vh - 150px);
justify-content: space-between;
align-items: center;
padding: 10px;

h4{
    flex: 0.03;
    background: lightgreen;
    width: 100%;
    padding: 10px 0;
    text-align: center;
}

`
const Actions = styled.div`
flex: 0.25;
display: flex;
flex-direction:column;
width: 100%;
button
{
    margin: 10px;
    padding: 10px 7px;
    background: none;
    border: 2px solid black;
    border-radius: 30px;
    cursor: pointer;
    width: 100%;

    &:hover{
        color: white;
        background: black;
    }
}

`

const Chepaters = styled.div`
flex: 0.65;
overflow: auto;
width: 100%;
display: flex;
flex-direction: column;
list-style: none;

.chapter{
    background: orange;
    width: 100%;
    padding: 10px 0;
    text-align: center;
    border-bottom: 1px solid gray;
}

.active{
    color: white;
    background: gray;
 
 &:hover{
     color: white;
     background: gray;
 }
}
`

const Content = styled.div`
padding: 10px;
flex:1;
textarea{
    height: 100%;
    width: 100%;
    resize: none;
    padding: 10px;
    font-size: 16px;
}
`