import 'dotenv/config'
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

const authorise = async (req ,res, next) => {
    const token = req.cookies.token;//Get token from HTTP-only cookie
    if(!token){
         return res
         .status(401)
         .json({message: 'This route requires an authentication token'});
         
    }

    try{
        const decodedToken = jwt.verify(token, JWT_SECRET);

        req.user = decodedToken;
        next();
    }catch(error){
        return res.status(401).json({message: 'The authentication token is invalid'});
    }
};

export default authorise;