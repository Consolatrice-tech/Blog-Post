import { check, validationResult } from "express-validator";
import blogData from"../Model/blogModel";
import Response from "../Helpers/response"
class Validator {

    static verifyAccess = async (req, res, next) => {

        const userIdFromToken =req.body.userId;
        const blogIdFromParams = req.params.id;

        const blog = await blogData.findById(blogIdFromParams);
            
            if (!blog){
                return Response.errorMessage (res, "Blog not exist", 404);
            
            }

            else if (userIdFromToken == blog.userId._id)
            return next();

            return Response.errorMessage(res, "You are not authorised", 401);
}

    
    
    static newAccountRules (){
        return [
        check("email", "invalid email").isEmail(),
        check("firstName", "first name must not contain special character").isAlpha(),
        check("lastName", "last name must not contain special character").isAlpha(),
        check("password", "You need to have a strong password").isStrongPassword(),
        check("gender", "gender should be male and female").isIn(["male","female"]),
        check("role", "role must be admin and user").isIn(["admin","user"]),
        //check("department", "department must not contain special character").isAlpha(),
        check("address", "Address must not contain special character ").isAlpha(),
        ]

    }
    static newRules(){
       return [
       check("email", "invalid email").isEmail(),
       check("password", "password must contain 8 characters").isStrongPassword(),
    ];
    }
    static newBlogpost(){
        return[check("title","title...").isLength({ max: 50})];
    }

/**
 * Validate Inputs
 * @body data inputs 
 * @return  {Object} error description or Return next middleware 
 */
    static validateInput = (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errormessage = errors.errors.map(e=> e.msg);
            
            return Response.errorMessage(res, errormessage, 400);
        }
        //console.log(e)
        return next();
    }
}
export default Validator;