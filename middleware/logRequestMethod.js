const logRequestMethod= (req, res, next) =>{
    console.log("New request with method ", req.method);
    next();
};

module.exports = logRequestMethod;