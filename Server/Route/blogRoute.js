import express from  'express';
import blogController from '../Controller/blogContoller';
import {verifyAuth} from '../middleware/AuthVerification';
import Validator from '../middleware/Validator'


const blogRoute=  express.Router();
blogRoute.post('/auth/blog/create',Validator.newBlogpost(), verifyAuth,blogController.Register);
blogRoute.get('/auth/blog/All/post',verifyAuth,blogController.getAllBlog);
blogRoute.get('/auth/blog/One/:id',verifyAuth,blogController.getOneBlog);
blogRoute.delete('/auth/blog/del/:id',verifyAuth,blogController.deleteOneBlog);
blogRoute.patch('/auth/blog/update/:id',verifyAuth,blogController.updateBlog);
blogRoute.get('/getallfromapi', blogController.getAllBlogsFromAPI);

//blogRoute.post(verifyAuth, blogController  );

export default blogRoute;