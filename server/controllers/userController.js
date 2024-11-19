const UserModel = require("../models/userModel");
const jsonwebtoken = require("../utils/jsonwebtoken");

exports.signup = async(req,res) => {
    try {
        const { username, password } = req.body;
        let user = await UserModel.findOne({username});
        if(user) return res.json("username taken")
        user = new UserModel({username,password})
        await user.save();
        return res.json(user)
    } catch (error) {
        return res.json(error)
    }
}

exports.login = async(req,res) => {
    try {
        const { username, password } = req.body;
        let user = await UserModel.findOne({username});
   
        if(!user || password!=user.password) return res.status(401).json("username or password is wrong")
        const token = await jsonwebtoken.getToken(user);
   
        res.cookie('token', token, {
            path: "/",
            expires: new Date(Date.now()+3600*1000),
            httpOnly:true,
            sameSite:"lax"
        })
        return res.json(token)
    } catch (error) {
        return res.json(error)
    }
}

exports.logout = async(req,res) => {
    try {
        res.clearCookie('token',{
            path:"/",
            httpOnly:true,
            sameSite:"lax"
        })
        return res.json("logout successfully")
    } catch (error) {
        return res.json(error)
    }
}

exports.me = async(req,res) => {
    try {
        let user=req.user  
        user= await UserModel.findById(user._id).select('-password')
        return res.json(user)
    } catch (error) {
        return res.json(error)
    }
}

