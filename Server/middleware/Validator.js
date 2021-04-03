import { check, validationResult } from "express-validator";
import blogData from"../Model/blogModel";
class Validator {

    static verifyAccess = async (req, res, next) => {

        const userIdFromToken =req.body.userId;
        const blogIdFromParams = req.params.id;

        const blog = await blogData.findById(blogIdFromParams);
            
            if (!blog){
                return res.status(404).json({
                    status:404,
                    message: "Blog Not Exist"

                })
            
            }

            else if (userIdFromToken = blog.userId._id)
            return next();
                        
    
            return res.status(401).json({
            status:401,
            message:"You Are Not Authorised"
    });
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
    static validateInput = (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errormessage = errors.errors.map(e=> e.msg);
            return res.status(400).json({
                error:errormessage,
                status:400,
            });
        }
        return next();
    }
}
export default Validator;