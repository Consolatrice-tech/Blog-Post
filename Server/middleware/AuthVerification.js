import {dataFromToken} from '../Helpers/Token';
import UserController from '../Controller/AuthController'

export const verifyAuth=(req, res, next)=>
{
    const token= req.header('x-auth-token');

    if(!token){
      return  res.status(404).json
        ({
            message: "no token provided",
        })
    }
    try{
        const user= dataFromToken(token).payload;
const users= UserController.UserData;
const data = users.findOne({email:user.email});
if(!data){
return res.status(404).json({
    message:"you are not a user"
})
}
req.body.userId=user.id;
return next();
    }
    catch(e){
        return res.status(404).json({
            message:"invalid token",
            status:404,
            
        })
    }
}


