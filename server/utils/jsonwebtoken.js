const jwt = require("jsonwebtoken")

exports.getToken = async(user) => {
    return jwt.sign({user},process.env.JWT_SECRET,{expiresIn:"1h"})
}

exports.verifyToken = async(req, res,next) => {
    try {
        const token = req.cookies.token
  
        if(!token) return res.json("session expired")
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
          if(err) return res.json("session expired");
          req.user=user.user;
          next()
        })
    } catch (error) {
        return res.json(error)
    }
}