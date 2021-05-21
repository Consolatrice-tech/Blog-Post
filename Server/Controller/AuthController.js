import bcrypt from "bcrypt";
import { generateAuthToken } from "../Helpers/token";
import userInfo from "../Model/UserModel";
import EmailHelper from "../Helpers/emailTemplate";
import Response from "../Helpers/response";

class UserController {

  static changePassword = async(req, res) =>{

    let{
      oldPassword,
      newPassword,
      confirmPassword
    }= req.body

    const userId = req.body.userId;
    const userDetails = await userInfo.findById(userId);

    if (bcrypt.compareSync(oldPassword, userDetails.password)){

      if (newPassword === confirmPassword){

        console.log(userDetails);

        const password = bcrypt.hashSync(newPassword, 10);
        const passwordChangedTime = Date.now()
        const userUpdated = await UserInfo.findByIdAndUpdate(userId,{

          password:password,
          passwordChangedTime: passwordChangedTime


        })

      

        return Response.successMessage(res, "password has changed", userUpdated, 200)
      }
      return Response.errorMessage (res, "new password and old password don't match", 404)

    }

    return Response.errorMessage (res, "Old Password provided is invalid", 417)
  }


  static SignUp = async (req, res) => {
    let {
      firstname,
      lastname,
      email,
      password,
      gender,
      role,
      department,
      adress,
    } = req.body;

    password = bcrypt.hashSync(password, 10);

    const isEmailExist = await UserInfo.findOne({ email: email });

    if (isEmailExist) {
      return Response.errorMessage(res, "Email is duplicated", 409);
    }

    req.body.password = password;
    const data = await UserInfo.create(req.body);
    console.log(data);

    if (!data) {
      return Response.errorMessage(res, "Account created failed", 417);
    } 
    else {
      let { password, ...dataWithOutPassword } = data._doc;

      await EmailHelper.userWelcomeEmail(dataWithOutPassword);

      return Response.successMessage(res,"Account created successfully",dataWithOutPassword, 201);
    }
  };

  static SignIn = async (req, res) => {
    let { email, password } = req.body;
    // const User = await UserData(email, password);
    //Users.push(User);//adding information in array
    //const data = Users.find((User) => User.email === email);
    const isUserExist = await userInfo.findOne({ email: email });

    // console.log(isUserExist);

    const is_passwordExist = bcrypt.compareSync(password, isUserExist.password);
    if (!isUserExist) {
        return Response.errorMessage(res, "login failed", 401);
    }


    if(bcrypt.compareSync(password, isUserExist.password)){
        const data = isUserExist;
        const token = generateAuthToken({
          id: data.id,
          email: data.email,
          role: data.role,
        });
    
        let { password, ...dataWithOutPassword } = data._doc;
    
        return Response.successMessage(res, "login successfully",{ token, dataWithOutPassword }, 200 );
    }
  

  };
}
export default { UserController };
