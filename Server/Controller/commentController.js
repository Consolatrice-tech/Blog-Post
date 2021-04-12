import commentInfos from "../Model/CommentsModel";
import blogInfos from "../Model/blogModel";
import Response from "../Helpers/response";

class commentController{

    static createComment = async (req, res)  => {

        let{content} = req.body;
        let blogIdFromParams = req.params.id;

        const newComment =await commentInfos.create(req.body);

        // console.log(newComment);
        
        const blog = await blogInfos.findByIdAndUpdate(
            blogIdFromParams,
            {
                $push:{
                    commentsId: newComment._id
                }
    })
    //console.log(blog)

    if(!blog){
    return Response.errorMessage (res,"Failed to create comment", 404 )

    }

    return Response.successMessage (res,"comment created successfully", blog, 200);
     
    }
    static getAllcomment = async (req, res) =>{
        const commentData = await commentInfos.find();

        return Response.successMessage(res, "Here are all comments", commentData, 200)

    }
    static getOneComment = async (req, res) =>{
        const commentsId = req.params.id;
        const commentData = await commentInfos.findById(commentsId)

        if (!commentData){

            return Response.errorMessage(res, "comment failed to getOne",417)
        }

        return Response.successMessage(res, "comment displayed successfully",commentData,201)
    }

    static UpdateComment = async (req, res) =>{
        const commentsId =req.params.id;

        let content =req.body.content;
            const  timestamp = new Date(Date.now());
            const commentData =await commentInfos.findByIdAndUpdate(commentsId,{
                content: content
            });
            
            if(!commentData){
                return Response.errorMessage(res, "Comment failed to update", 404)
            }
            const commentUpdate= await comment.Infos.findById(commentsId);
            return Response.successMessage(res, "comment successfully Updated",commentUpdate,201 )

    }
    
    static deleteComment = async (req, res) =>{

        const commentsId = req.params.id;
        const commentData = await  commentInfos.findByIdAndDelete(commentsId);

        // console.log(commentsId);

        if(!commentData)
        {
        return Response.errorMessage(res, "delete comment failed", 417);
 
        }
        return Response.successMessage(res, "comment is deleted successfully", data, 201);

        }

    }


export default commentController;