const jwt = require('jsonwebtoken');

const jwtMiddleware = (req,res,next)=>{
    try{
        console.log("Inside jwt middleware");
        const token = req.headers['authorization'].slice(7);
        console.log(token);
        const jwtResponse = jwt.verify(token,process.env.JWTKEY)
        console.log(jwtResponse);
        req.payload =jwtResponse.userId
        next()
    }
    catch(err){
        res.status(402).json("AuthorizationError")
    }
}

module.exports = jwtMiddleware