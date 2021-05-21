import {dataFromToken} from '../Helpers/Token';
import Response from "../Helpers/response";
import userInfo from '../Model/UserModel.js';

export const verifyAuth = async (req, res, next) =>{
    const token = req.header("x-auth-token");

    if(!token)
    {
        return Response.errorMessage(res, "no token provided", 404);
    }

    try{

        const user= dataFromToken(token).payload;

        const data = await userInfo.findById(user.id);

if(!data)
{
return Response.errorMessage(res, "Please provide true credentials", 404);
}

if (user.passwordChangedTime != data.passwordChangedTime){
    
    return Response.errorMessage(res, "Please re-login, Password has been changed",404)
}



req.body.userId =user.id;
return next();

    }
    catch(e){
        console.log(e);


return Response.errorMessage(res, "invalid token", 404);
        
    }
}


