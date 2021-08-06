const express = require('express')
const fs=require('fs')
const jwt=require('jsonwebtoken')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  //res.send('Hello World!')
  const a =fs.readFileSync('index.html')
  res.send(a.toString())
})
app.post('/api/post',verifytoken,(req,res)=>{
  jwt.verify(req.token,'secretkey',(err,authdata)=>{
    if(err){
      res.sendStatus(403)
    }
    else{
      res.json({
        message:"dil dil",
        authdata
      })
    }
  })
  
})
app.post('/api/login',(req,res)=>{
  const user ={
    id: 1,
    username:"acc",
    email:"acc@gmail.com"

  }
  jwt.sign({user},'secretkey',{expiresIn:'30s'},(err,token)=>{
    res.json({
      token
    });
  })
})

function verifytoken(req,res,next){
    const bearerheader=req.headers['authorization'];
    if(typeof bearerheader !== 'undefined'){
        const bear=bearerheader.split(' ');
        const token=bear[1];
        req.token=token
        next();
    }else{
      res.sendStatus(403)
    }
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})