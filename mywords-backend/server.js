import  mongoose  from "mongoose";
import express  from "express";
import users from "./user.js"
import stories from "./stories.js"
import chepters from "./chapters.js"
import cors from "cors"
import chapters from "./chapters.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const SECRET_KEY = "qazwsxedc!@#$%$#@!"
const app = express();
const port = process.env.PORT || 9000;

app.use(express.json());
app.use(cors())
app.use((req,res,next)=>
{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","*")
    next();
})


const connectionURL = "mongodb+srv://ravi:dWoCXwiPGWBD1ooW@cluster0.yqtp1.mongodb.net/myWordsdb?retryWrites=true&w=majority"
mongoose.connect(connectionURL)


app.get("/",(req,res)=>res.status(200).send('Working fine'));

app.post("/mywords/newuser", async (req,res)=>{
    const user = req.body;
    user.password = await bcrypt.hash(user.password,10);
    await users.create(user, (err,data) =>
    {
        if(err)
        {
            res.status(500).send(err);
        }
        else
        {
            res.status(201).send("You have successfully registered, Please login to your account!");
        }
    })
})

app.post("/mywords/verifyuser",async (req,res)=>
{
    const user = req.body;
    const loginuser = await users.findOne({"username": user.userid}); 
    if(!loginuser)
    {
        res.status(401).send({message:"Invalid Username or Password."})   
    } 
    else
    {
        if(await bcrypt.compare(user.password, loginuser.password))
        {
            const token = jwt.sign({id: loginuser._id, username: loginuser.username}, SECRET_KEY)
            res.status(200).send({token: token, message: "You have successfully signed in"}); 
        }
        else
        {
            res.status(401).send({message:"Invalid Username or Password."})   
        }
    }
    
})


app.post("/mywords/createstory",async (req,res)=>
{
    const token = req.headers['x-access-token']
    try
    {
        const decode = jwt.verify(token, SECRET_KEY)
        const user = await users.findOne({ "username" : decode.username})   
        if(user)
            {
                const story = req.body;
                story.userid = decode.id;
                story.username = decode.username;
                await stories.create(story, (err,data) =>
                    {
                        if(err)
                        {
                            res.status(500).send(err);
                        }
                        else
                        {
                            res.status(201).send(data);
                        }
                    })
            }
        else
            {
                res.status(500).send("Unauthorized");
            }
    }
    catch(error)
    {
        res.status(500).send("Unauthorized");
    }   
})

app.post("/mywords/stories", async (req,res)=>{

    const token = req.headers['x-access-token']

    try
    {
        const decode = jwt.verify(token, SECRET_KEY)
        const Username = decode.username;
        const user = await users.findOne({ "username" : Username})

        if(user)
            {
                let story = []
                stories.find((err,data) =>
                {
                    if(err)
                    {
                        res.status(500).send(err);
                    }
                    else
                    {
                        for(let i=0;i< data.length;i++)
                        {
                            if(data[i].userid == decode.id && data[i].storytype == req.body.storytype)
                            {
                                story.push(data[i])
                            }     
                        }
                        res.status(200).send(story);
                    }

                })
            }
        else
        {
            res.status(500).send("Unauthorized");
        }
    }
    catch(error)
    {
        res.status(500).send("Unauthorized");
    }
    
    
})

app.post("/mywords/createchepter", async (req,res)=>{

    const token = req.headers['x-access-token']

    try
    {
        const decode = jwt.verify(token, SECRET_KEY)
        const Username = decode.username;
        const user = await users.findOne({ "username" : Username})

        if(user)
            {
                const chepter = req.body;
                await chepters.create(chepter, (err,data) =>
                {
                    if(err)
                    {
                        res.status(500).send(err);
                    }
                    else
                    {
                        res.status(201).send(data);
                    }

                }
            )}
        else
            {
                res.status(500).send("Unauthorized");
            }
    }
    catch (error)
    {
        res.status(500).send("Unauthorized");
    }
})

app.post("/mywords/chepters",async (req,res)=>
{
    const chepter = req.body;
    await chepters.find((err,data) =>
    {
        if(err)
        {
            res.status(500).send(err);
        }
        else
        {
            let chepterdata = []
            for(let i= 0 ;i < data.length ; i++)
            {
                if(chepter.storyid === data[i]["storyid"])
                {
                    chepterdata.push(data[i])
                }
            }
            res.status(200).send(chepterdata);
        }

    })
         
   
})

app.put("/mywords/updatechapter", async (req,res)=>
{
    
    try
    {
        const token = req.headers['x-access-token']
        const decode = jwt.verify(token, SECRET_KEY)
        const Username = decode.username;
        const user = await users.findOne({ "username" : Username})

        if(user)
        {
            const chapter = []
            await chepters.find((err,data) =>
            {
                if(err)
                    {
                        res.status(500).send(err)
                    }
                else
                    {
                        for(let i = 0; i < data.length;i++)
                            {
                                if(req.body.id == data[i].id)
                                {
                                    chapter.push(data[i].id)
                                    break;
                                }
                            }
                        if(chapter.length == 0)
                            { 
                                res.status(404).send("The chapter with given id is not avilable!")
                            }
                        else{
                            chepters.updateOne({ _id: req.body.id },{ content: req.body.content}) 
                            .then(result => {
                                res.status(201).send("Content Updated Successfully!")  
                            })  
                        }

                    }
            })  

        }
        else
        {
            res.status(500).send("Unauthorized");
        }
    }
    catch(error)
    {
        res.status(500).send("Unauthorized");
    }
      
})


app.get("/mywords/chepters/:id",(req,res)=>
{    
    let chaptercontent = ""
    chapters.find((err,data) =>
    {    
        if(err)
        {
            res.status(500).send(err);
        }
        else
        {
            for(let i = 0; i < data.length;i++)
            {
                if(req.params.id == data[i].id)
                {
                    chaptercontent = data[i].content
                    break;
                }
            }
            res.status(200).send(chaptercontent);
        }

    })
})


app.post("/mywords/stories/search", async (req,res ) =>{

    try{
    const datag = req.body
    let response = []
    await stories.find((err,data) =>{
        if(err)
        {
            res.status(500).send("err")
        }
        else
        {
            if(datag.searchData)
            {
            let resultnumber = 10;
            for(let i = 0; i < data.length;i++)
            {
                if(data[i].storytype == "General")
                {
                   let mytitle = data[i].title.toLowerCase();
                   let myuser = data[i].username.toLowerCase();
                   let reqData = datag.searchData.toLowerCase();
                   if(mytitle.includes(reqData) || myuser.includes(reqData))
                   {
                       response.push(data[i])
                      resultnumber -= 1; 
                   }                             
                }
                if(resultnumber < 1)
                {
                    break
                }
            } 
        }   
            res.status(200).send(response);           
        }
    })

    }
    catch(error)
    {
        res.status(500).send(err);
    }
    
})

app.listen(port,() => console.log('Listing post 9000'))