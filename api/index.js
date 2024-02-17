const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const app=express();
const user=require('./Model/User')
const bcrypt=require('bcrypt')
const dbconnection=require('./connection')
const jwt=require('jsonwebtoken');
const salt= bcrypt.genSaltSync(10);
const cookieParser=require('cookie-parser');
const secret='buxuw82189xbxsh'
app.use(cors({credentials:true,origin:'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());

dbconnection();
app.post('/register', async (req,res) => {
    const {username,password} = req.body;
    try{
      const userDoc = await user.create({
        username,
        password:bcrypt.hashSync(password,salt),
      });
      res.json(userDoc);
    } catch(e) {
      console.log(e);
      res.status(400).json(e);
    }
  });
  app.post('/login',async(req,res)=>{
    const {username,password} = req.body;
    const userDoc= await user.findOne({username});
    const passOk=bcrypt.compareSync(password, userDoc.password);
    console.log("true")
    if(passOk)
    {
      //logedin
      jwt.sign({username,id:userDoc.id},secret,{},(err,token)=>{
        if (err) {
          throw err;
        }
        res.cookie('token',token).json({
          id:userDoc._id,
          username,
        });
      })
    }
    else
    {
      res.status(400).json('wrong');
    }
  })
  app.get('/profile',(req,res)=>{
    const {token} =req.cookies;
    jwt.verify(token,secret,{},(err,info)=>{
      if(err)
      {
        throw err;
      }
      res.json(info);
    });
  });
  app.post('/logout',(req,res)=>{
    res.cookie('token','').json('ok')
  })
app.listen(4000,()=>{
    console.log("server started")
});