const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const validator=require("validator")
const userModel=require("../models/userModel.js")

//login user
module.exports.loginUser=async(req,res)=>{
    const{email,password}=req.body;
    try{
        const user=await userModel.findOne({email});

        if(!user){
            return res.json({success:false,message:"User dose not exists"})
        }

        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.json({success:false,message:"Invalid credentials"})
        }

        const token=createToken(user._id);
        res.send({success:true,token});
    }catch(error){
        console.log(error);
        return res.json({success:false,message:"Error"})
    }
}

const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

//register user

module.exports.registerUser=async(req,res)=>{
    const{name,password,email}=req.body;
    try{
        const exist=await userModel.findOne({email:email});

        // checking is user already exists 
        if(exist){
            return res.json({success:false,message:"User already exists"})
        }

        //validating email formate and strong password
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please enter valid email"})
        }

        if(password.length<8){
            return res.json({success:false,message:"Please enter strong password"})
        }

        //hashing user password
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);
        const newUser=new userModel({name:name,email:email,password:hashedPassword});

        const user=await newUser.save();
        const token=createToken(user._id);
        res.json({success:true,token})

    }
    catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}