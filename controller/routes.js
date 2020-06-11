var express = require('express');
var userRouter = express.Router();
var passport = require('passport');
var passportConfig = require('../passport');
var User = require('../Models/User');
var JWT = require('jsonwebtoken');

const signToken = userID =>{
    return JWT.sign({
        iss : "Haneef Muhammad",
        sub : userID
    },"IamCule",{expiresIn : "1h"});
};

userRouter.post('/register',(req, res)=>{
    const {username, password,email} = req.body;
    User.findOne({ $or: [{"username": username}, {"email": email}]},(err,user)=>{
        if(err)
            res.status(500).json({message : {msgBody :"Error has occured", msgError : true}});
        else if(user){
            if(user.username===username && user.email===email)
                res.status(400).json({message : {msgBody :"Email and Username Already Exists", msgError : true}});
            else if(user.username===username)
            res.status(400).json({message : {msgBody :"Username Already Exists", msgError : true}});
            else if(user.email===email)
            res.status(400).json({message : {msgBody :"Email Already Exists", msgError : true}});
        }
        else {
            const newUser = new User({username, password,email});
            newUser.save((err, document)=>{
                if(err)
                    res.status(400).json({message : {msgBody :"Error while creating user "+err, msgError : true}});
                else
                    res.status(201).json({message : {msgBody :"User Created Successfully!", msgError : false}});    
            });
        }
    });
});

userRouter.post('/login',passport.authenticate('local',{session:false}),(req, res)=>{
    if(req.isAuthenticated()){
        const user = req.user;
        const {_id} = req.user;
        const token = signToken(_id);
        const cookie = res.cookie('access_token',token,{httpOnly : true, sameSite : true});
        res.status(201).json({isAuthenticated:true,user});
    }
});

userRouter.get('/logout', passport.authenticate('jwt',{session:false}),(req, res)=>{
    res.clearCookie('access_token');
    res.status(201).json({success:true, user: {username : "",email: ""}, message: "Logged out Successfully", isAuthenticated: false});
});

userRouter.get('/authenticated',passport.authenticate('jwt',{session : false}),(req, res)=>{
    const {username, email} = req.user;
    res.status(201).json({user:{username, email}, isAuthenticated : true});
});



module.exports = userRouter;