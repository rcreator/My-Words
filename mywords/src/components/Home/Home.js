import React,{useState, useEffect} from 'react'
import { connect } from "react-redux"
import {useNavigate} from "react-router-dom"
import Header from '../Header'
import styled from 'styled-components'
import Sidebar from './Sidebar'
import Main from './Main'
import {onload} from "../../Actions/index"
import  jwt from 'jwt-decode'
import { loadStory} from "../../Actions/index"

function Home(props) {

    const navigate = useNavigate()
    const [active,setActive] = useState("Personal")
    const [story,setStory] = useState("")
    const [view,setView] = useState("Grid")
    const [storytitle,setStorytitle] = useState("")
    const [verified,setVerified] = useState(false)
    const [stories,setStories] = useState([])

    useEffect(() => {
        loadStory(active).then((data) => setStories(data)).catch(err => console.log(err))
        setActive(window.localStorage.getItem('active'));
        const token  = localStorage.getItem('token');
        if(token)
        {
            const user = jwt(token)
            if(!user)
            {
                localStorage.removeItem('token')
                navigate('/login')
            }
            else
            {
                setVerified(true)
            }
        }else
            {
                localStorage.removeItem('token')
                navigate('/login')
            }
    }, []);

    
    useEffect(() => {
        console.log(stories)
        setStories([]);
        setView("Grid");
        window.localStorage.setItem('active', active);
        loadStory(active).then((data) => setStories(data)).catch(err => console.log(err))
    },[active]);


    return (
        <Container>      
        <Header 
        verified = {verified}/>
        <Content>
            <SidebarContent>
                <Sidebar 
                setActive = {(item)=>{setActive(item)}}
                active = {active} 
                />
            </SidebarContent>
            <MainContent>
                <Main 
                setStorytitle = {(item)=>{ setStorytitle(item)}}
                stories= {stories}
                storytitle = {storytitle}
                setStory = {(item)=>{ setStory(item)}}
                story = {story}
                setView = {(item)=>{ setView(item)}}
                view = {view}
                setActive = {(item)=>{ setActive(item)}}
                active = {active}/>
            </MainContent>
            
        </Content>
        

        </Container>
    )
}


const mapStateProps = (state) =>
{
    return{
        user: state.userState.user
    };
}

const mapDispatchToProps = (dispatch) =>({
    onload : (payload) => dispatch(onload(payload))
})


export default connect(mapStateProps,mapDispatchToProps)(Home)
        

const Container = styled.div
`

`

const Content  = styled.div`
display: flex;


`

const SidebarContent  = styled.div`
flex: 0.20;


`
const MainContent  = styled.div`
flex: 0.80;


`

