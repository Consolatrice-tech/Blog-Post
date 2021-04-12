import express from  'express';
import UserController from '../Controller/AuthController';
import Validator from '../middleware/Validator';
import {verifyAuth} from '../middleware/AuthVerification';


const route=  express.Router();
 route.post('/auth/signup', Validator.newAccountRules(), Validator.validateInput, UserController.UserController.SignUp);
 route.post('/auth/signin',Validator.newRules(), Validator.validateInput, UserController.UserController.SignIn)
 route.post('/auth/change-password',verifyAuth, UserController.UserController.changePassword)

 export default route;
 