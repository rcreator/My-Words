import { SET_STORY } from "../Actions/actionType";

const INITIAL_STATE={
    storyInfo : null,
};

const storyReducer = (state = INITIAL_STATE, action) =>{
    switch(action.type)
    {
        case SET_STORY:
            return{
                ...state,
                storyInfo: action.storyInfo,
            }
        default: 
            return state;    
    }
}

export default storyReducer;