import bcrypt from 'bcrypt'
import  {generateAuthToken}  from '../Helpers/token';
import UserData from '../model/Usermodel';

class UserController {
    static SignUp = async(req, res) => {
       
        let {
            firstname,
            lastname,
            email,
            password,
            gender,
            role,
            department,
            adress
        } = req.body;

        password = bcrypt.hashSync(password, 10)

        const isEmailExist = await UserData.findOne({email:email});
        if (isEmailExist) {
            return res.status(409).json({
                status: 409,
                error: "email is deplicated"
            });
        }
        req.body.password=password;
        const data = await UserData.create(req.body);
        console.log(data);
        if (!data) {
            return res.status(417).json({
                status: 417,
                message: "account creation failed"
            })
        }
        else{
            let  { password, ...dataWithOutPassword}=data._doc
        return res.status(201).json({
            status: 201,
            message: "Account created successfully",
            data:dataWithOutPassword
        })
        }
    }

    static SignIn = async (req, res) => {
        let {
            email,
            password } = req.body;
       // const User = await UserData(email, password);
        //Users.push(User);//adding information in array
        //const data = Users.find((User) => User.email === email);
        const isUserExist = await UserData.findOne({email: email});
        const is_passwordExist=bcrypt.compareSync(password,isUserExist.password)
        if (isUserExist && is_passwordExist) {
            const data= isUserExist;
            const token = generateAuthToken({
                id:data.id,
                email:data.email,
                role:data.role,
            })
            return res.status(200).json({
                status: 200,
                message: "logged in successful",
                token: token,
                data
            })
              }
        return res.status(401).json({
            status: 401,
            message: "log in failed"
        })
    }
}
export default {UserController,UserData};






