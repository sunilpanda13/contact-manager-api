const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/env.config");

const auth = async(req,res,next)=>{
    try{
        if(req.header("x-auth-token")){
            let token = req.header("x-auth-token");
            try{
                await jwt.verify(token,jwtSecret);
                next();
            }catch(err){
                res.status(401).json({
                    message : "Unauthorized request!! Bad token"
                })
            }
        }else{
            res.status(401).json({
                message : "Unauthorized request!! Token missing"
            });
        }
    }catch(err){
        res.status(400).json({
            message: "Something went wrong",
            error:err
        })
    }
}

module.exports = auth;