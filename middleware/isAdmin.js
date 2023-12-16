const isAdmin = (req, res, next) => {
    if(req.body.isAdmin){
        next();
    } else {
        res.status(403).json({
            message: "Permission denied. Admin access required !!",
        });
        return;
    };
};

module.exports = isAdmin;