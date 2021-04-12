import mongoose from "mongoose";

    const blogSchema = new mongoose.Schema({
        title: {type:String, required:true},
        content:{type:String, required:true},
        userId:{
            type: mongoose.Schema.ObjectId,

            ref:"user",

            required: [true, "user is required"]
      
    },
    timestamp:{type:String
    },
    commentsId:[
        {
        type: mongoose.Schema.ObjectId,
        ref: "comment"
        }],
    viewId : {
        type: mongoose.Schema.ObjectId,
        ref: "views"
    },
    
});

blogSchema.pre(/^find/, function(next){

    this.populate({
        path:"userId",
        select:"firstName  email"

    })
    this.populate({
        path:"commentsId",
        select: "content user timestamp"
    })
    
    next();


});
const blogInfo = mongoose.model('blog', blogSchema);
export default blogInfo;