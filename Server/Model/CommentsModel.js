import mongoose from "mongoose"

const commentSchema =  new mongoose.Schema({
    content:{
        type: String,
        required:[true,"Please add your comment here"]
    },
    timestamp:{
        type:Date,
        default:new Date(Date.now())
    },
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:"user",
        required:[true,"Please provide us your username"]
    }

});
commentSchema.pre(/^find/, function(next){

    this.populate({
        path:"userId",
        select:"firstName  email"

    })
    next();


});

const commentInfos = mongoose.model('comment', commentSchema);
export default commentInfos;