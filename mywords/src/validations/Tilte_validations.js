import validation from "./validations"


export const story_validation = (value) =>
{
    let error= "";
    if(!value || value === "")
    {
        error = validation.story_title_required
    }
    else if(value.length > 30)
    {
        error = validation.Maxlentgth;
    }  
    return error;
}

export function storyOnclick(storyData)
{
    let error= "";
    if(!storyData || storyData === "")
    {
        error = validation.story_title_required
    }
    else if(storyData.length > 30)
    {
        error = validation.Maxlentgth
    }
    return error;
}

export const chapter_validation = (value) =>
{
    let error= "";
    if(!value || value === "")
    {
        error = validation.chapter_title_required
    }
    else if(value.length > 30)
    {
        error = validation.Maxlentgth;
    }  
    return error;
}

export function chapterOnClick(chapterData)
{
    let error= "";
    if(!chapterData || chapterData === "")
    {
        error = validation.chapter_title_required
    }
    else if(chapterData.length > 30)
    {
        error = validation.Maxlentgth
    }
    return error;
}

