import blogData from "../Model/blogModel";
import Response from "../Helpers/response";
import axios from "axios";

//const Blogs = [];

class blogController {

  static getAllBlogsFromAPI = async (req,res) => {

    try{

      const responseFromAPI = await axios.get('https://blogpost-api-shecancode.herokuapp.com/api/v1/blog/dash/all')

      return Response.successMessage(res,"fetched successfully", responseFromAPI.data,200)

    }catch(e)
{
  console.log(e)

  return Response.errorMessage(res, "failed to fetch", 403)
}
  }
  static Register = async (req, res) => {
    //const blogId= Blogs.length+1;
    let { title, content } = req.body;

    const timestamp = new Date(Date.now());

    /* const is_blogRegistered= Blogs.find(blog=>blog.title===title);       
        if(is_blogRegistered){
             return res.status(409).json({statu:409, error:"blog arleady registered"});
         }*/

    // const blog= new blogData(blogId, title, content, timestamp, userId);
    // Blogs.push(blog);// push user data into users array

    const data = await blogData.create(req.body);

    if (!data) {

    return Response.errorMessage(res, "Input failed", 417);
 
    }
    return Response.successMessage(res, "blog is created successfully",data,201);
  };
  static getAllBlog = async (req, res) => {
    const data = await blogData.find();

    return Response.successMessage(res, "posts available here",data,200);

  };

  static getOneBlog = async (req, res) => {
    const blogId = req.params.id;

    const data = await blogData.findById(blogId);

    if (!data) {

    return Response.errorMessage(res, "Input failed", 417);

    };

  };

  static deleteOneBlog = async (req, res) => {
    const blogId = req.params.id;

    const data = await blogData.findByIdAndDelete(blogId);

    if (!data) {

    return Response.errorMessage(res, "delete failed", 417);
    }
    return Response.successMessage(res, "Updated Successfully",dataUpdate,200);
   
  };

  static updateBlog = async (req, res) => {
    const blogId = req.params.id;
    //const blogIndex= Blogs.indexOf(Blogs.find(blog=>blog.blogId===blogId));

    let { title, content } = req.body;

    const data = await blogData.findByIdAndUpdate(blogId, {
      title: title,
      content: content,
    });

    if (!data) {

    return Response.errorMessage(res, "update failed", 417);

    }

    const dataUpdate = await blogData.findById(blogId);
    return Response.successMessage(res, "Data updated successfully",dataUpdate, 200)




    /* const timestamp = new Date(Date.now());
        const blog= new blogData(blogId, title, content, timestamp, userId);
      
      Blogs.splice(blogIndex,1,blog);
      const data = Blogs.find(b => b.blogId === blogId)
        if(data){
              
            return res.status(200).json({
                status:200,
                message: "blog inserted   successfully ",
                data
            
                 
               })
            }
            return res.status(417).json({
                status:417,
                message: "update failed",
           
            })
            */
  };
}

export default blogController;
