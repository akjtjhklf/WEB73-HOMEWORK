const jwt = require("jsonwebtoken");


const verifyJwt = (req,res,next) => {
    try {
        const body = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(body,"WEB73-HOMEWORK"); 
        if(decoded && req.originalUrl.includes(decoded.type)) {
            next(); 
        }
    } catch {
        res.json({
            message: "Invalid JWT",
        })        
    }
};

module.exports = verifyJwt;