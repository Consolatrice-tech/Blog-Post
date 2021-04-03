import jwt from "jsonwebtoken";
import dotenv from "dotenv";
//import jwt_decode from "jwt-decode";


dotenv.config({ path: "../../.env" });

export const generateAuthToken = (payload)=>{
    const token = jwt.sign({ payload }, process.env.SECRET_KEY, {
        expiresIn: "1d"
      });
      return token;
    }

   export const dataFromToken= (token)=>{
   
    const data= jwt.verify(token, process.env.SECRET_KEY);
    return  data; 

   } 
/*    
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoxLCJlbWFpbCI6IlVtdXRvbmlnZW50QGdtYWlsLmNvbSIsInJvbGUiOiIgdGVzdGVyIn0sImlhdCI6MTYxNjY2NjQ5NCwiZXhwIjoxNjE2NzUyODk0fQ.qgM6iNGusXg3vQ5T_2rJOSu3ZQRh3gBk2uDr01z1Auo";
const decoded = jwt_decode(token);

console.log(decoded);
const decodedHeader = jwt_decode(token, { header: true });
console.log(decodedHeader);*/
