import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import axios from '../connections/axios'

function Dropdown(props) {

    const [isStory,setIsStory] = useState(false)
    const [isOpen,setIsOpen] = useState(false)
    const [value,setValue] = useState("")
    const [stories,setStories] = useState([])
    const ref = useRef(null);

    const changeHanle = (e) =>
    {    
        setStories([])
        setIsOpen(true)
        setValue(e.target.value)
        axios.post("/mywords/stories/search",{
            searchData: e.target.value
        })
        .then(res => 
        {
            if(res.data.length != 0)
            {    
                setStories(res.data)
                setIsStory(true)
            }
            else
            {
                setIsStory(false)
            }           
        })
    }

    useEffect(()=>{
            document.addEventListener("click", close)
            return () => document.removeEventListener("click", close);
    },[])

    function close(e){
        setIsOpen(e && e.target === ref.current)
    }


    return (
        <Container className='InputDropdown'>
            <TextInput className="textInput" >
                    <input ref={ref}
                    type="text"
                    placeholder='Seach Stories'
                    value={value}
                    onChange={changeHanle}
                    />
            </TextInput>
            { (isOpen && isStory) ?
            <Options className="Options" >
                
                   {stories.map((stories)=>
                    (
                        <div key={stories.id} onClick={() => setValue(stories.title)}>{stories.title}<span>Author: {stories.username}</span></div>
                    ))}
                    
            </Options>
            : null}  
        </Container>
    )
}

export default Dropdown


const Container = styled.div`
width: 100%;
display: flex;
position: relative;
flex-direction: column;
padding: 0 !important;
`

const TextInput = styled.div`
input{ 
    height: 30px;
    width: 100%;
    border: 1px solid gray;
    padding: 0 10px;
    }
`

const Options = styled.div`
position: absolute;
top: 37px;
border-radius: 10px;
background: white;
width: 100%;

box-shadow: 0 2px 4px rgb(0 0 0 / 20%);
div{
    z-index:100;
    padding: 6px;
    &:hover
    {
        background: rgba(0,0,0,0.2);
    }

    span{
        font-size: 12px;
        padding: 12px;
    }
}
`