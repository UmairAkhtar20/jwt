require('dotenv').config()
const express=require('express')
const app=express();
const jwt=require('jsonwebtoken')

app.use(express.json())

const posts = 
[
    {
        username:"kyle",
        title:"post1"
    },
    {
        username:"jim",
        title:"posts2"
    }
]


app.get('/posts',verifytoken,(req,res)=>{
    res.json(posts.filter(post => post.username === req.user.name))
})
app.post('/login',(req,res)=>{
    const username=req.body.username
    const user = {name: username}
    const accesstoken= jwt.sign(user,process.env.ACCES_TOKEN)
   // console.log(user)
    res.json({accesstoken:accesstoken})
})

function verifytoken(req,res,next){
    const header=req.headers['authorization']
    const token = header && header.split(' ')[1]
    if(token == null) return res.sendStatus(401)

    jwt.verify(token,process.env.ACCES_TOKEN,(err,user)=>{
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

app.listen(4000)