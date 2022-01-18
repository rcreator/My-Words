import { auth, provider } from '../firebase'
import { SET_USER } from './actionType';
import { signInWithPopup } from "firebase/auth";
import axios from '../connections/axios';



export const setUser = (payload) =>
({
    type: SET_USER,
    user: payload,
})

export function signInSocialAPI() 
{
    return (dispatch) => {
        signInWithPopup(auth, provider)
        .then((payload)=>{

            const userData = 
            {
                username : payload.user.email,
                email: payload.user.email,
                password: null,
                authSource: 1 
            }
            dispatch(setUser(userData));
        })
        .catch(error => alert(error.message));
    }
}

export function signUpManual(userData) 
{
    return (dispatch) => 
    {
        dispatch(setUser(userData));
    }
}


export function signInManual(userData) 
{
    return (dispatch) => 
    {
        dispatch(setUser(userData.userid));
    }
}


export function onload(user){
    return(dispatch) =>{
        dispatch(setUser(user))
    }
}


export async function loadStory(story)
{
      const response =  await axios.post("/mywords/stories",{
            storytype : story
        },{ headers: {"x-access-token" : localStorage.getItem('token')}})
    const data = await response.data;
    return data            
}
