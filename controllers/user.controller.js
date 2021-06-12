const user = require("../model/user.schema");
const bcrypt = require("bcryptjs");
const joi = require("joi");
const jwt = require("jsonwebtoken");
const secretKey = "contactManager"

exports.signIn = async (req,res)=>{
    const userLoginSchema = joi.object({
        email : joi.string().required().email(),
        password : joi.string().required()
    });

    try{
        let userLogin = await userLoginSchema.validateAsync(req.body);
        let userMatch = await user.findOne({email : userLogin.email.toLowerCase()});

        if(userMatch){
            let isPasswordMatch = await bcrypt.compare(userLogin.password,userMatch.password);
            if(isPasswordMatch){
                const payload = {
                    userInfo : {
                        id : user._id
                    }
                };

                const token = await jwt.sign(payload,secretKey,{expiresIn : 7200});
                res.status(200).json({
                    message : "Signed in",
                    user:{
                        id : userMatch._id,
                        name : userMatch.name,
                        email : userMatch.email
                    },
                    token
                });
            }else{
                res.status(400).json({
                    message : "Email/Passowrd doesn't exist"
                });
            }
        }else{
            res.status(400).json({
                message : "Email/Passowrd doesn't exist"
            });
        }
    }catch(err){
        res.status(500).json({
            message : "Something went wrong",
            error : err
        });
    }
}

exports.register = async (req,res)=>{
    const userSchema = joi.object({
        name : joi.string().required().min(3),
        email : joi.string().required().email(),
        password : joi.string().required().min(6).max(10)
    });
    try{
        let userData = await userSchema.validateAsync(req.body);
        let isUserExist = await user.findOne({email:userData.email});
        if(!isUserExist){
            let newUser = new user(userData);
            let salt = await bcrypt.genSalt(10);
            newUser.password = await bcrypt.hash(newUser.password,salt);
            await newUser.save();
            res.status(200).json({
                message : "User created successfully",
                user : {
                    id : newUser._id,
                    name : newUser.name,
                    email : newUser.email
                }
            });
        }else{
            res.status(400).json({
                message : "Email is already linked with another account"
            });
        }
    }catch(err){
        res.status(400).json({
            message : "Something went wrong",
            error : err
        });
    }
}

exports.isEmailExist =async(req,res)=>{
    try{
        let email = await user.findOne({email:req.body.email});
        if(!email){
            res.status(200).json({
                message:"Email not exist",
                exist:false
            });
        }else{
            res.status(200).json({
                message:"Email already taken",
                exist:true
            });
        }
    }catch(err){
        res.status(400).json({
            message:"Something went wrong",
            error:err
        });
    }
}