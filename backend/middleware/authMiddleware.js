const jwt = require('jsonwebtoken');

const Protect = (req, res, next) => {
    try{
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith('Bearer')){
            return res.status(401).json({message: 'Not Authorized!'});
        }
        const token = authHeader.split(" ")[1];
        const user = jwt.verify(token, process.env.JWT_SECRET);
        if(!user){  
            return res.status(401).json({message: 'Inavlid Token!'});
        }
        res.user = user;
        next();
    }
    catch(err){
        return res.status(401).json({message: 'Token verification failed!'});
    }
}

module.exports = Protect;