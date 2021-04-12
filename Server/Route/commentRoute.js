import express from "express";
import commentController from "../Controller/commentcontroller";
import { verifyAuth } from "../middleware/AuthVerification";

const commentRoute = express.Router();

commentRoute.post('/user/Comment/:id',verifyAuth, commentController.createComment);
commentRoute.get('/user/Comment',verifyAuth, commentController.getAllcomment);
commentRoute.get('/user/Comment',verifyAuth, commentController.getOneComment);
commentRoute.get('/user/Comment',verifyAuth, commentController.UpdateComment);
commentRoute.delete('/user/Comment/:id',verifyAuth, commentController.deleteComment);

export default commentRoute;