import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  address: { type: String, default: "Rwanda" },
  email: { type: String, required: [true, "email required"] },
  username: {type:String, required: [true, "username is required"] },
  phonenumber: {type: String, required: [true, "Username is required"] },
  gender: { type: String, enum: ["male", "female"] },
  role: {
    type: String,
    enum: ["user", "admin"],
    required: true,
    default: "user",
  },
  password: { type: String, 
  required: [true, "password required"] },
  department: String,

  passwordChangedTime:{
    type:String,
    default: Date.now()
  }
});

const userInfo= mongoose.model('user', userSchema);

export default userInfo;

//class UserData{

/*constructor(id, firstName, lastName, email, password,gender, role, adress, department){
    this.id=id;
    this.firstName= firstName;
    this.lastName= lastName;
    this.adress= adress;
    this.email= email;
    this.departmenrt= department;
    this.gender= gender;
    this.role= role;
    this.password= password;
   // this.confirmPassword= confirmPassword;

}
}*/
//export default UserData;




