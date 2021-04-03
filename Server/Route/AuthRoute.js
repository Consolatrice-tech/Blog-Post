import express from  'express';
import UserController from '../Controller/AuthController';
import blogController from '../Controller/blogContoller';
import Validator from '../middleware/Validator';


const route=  express.Router();
 route.post('/auth/signup', Validator.newAccountRules(), Validator.validateInput, UserController.UserController.SignUp);
 route.post('/auth/signin',Validator.newRules(), Validator.validateInput, UserController.UserController.SignIn)
 route.post('/auth/register',blogController.Register);

 export default route;
 