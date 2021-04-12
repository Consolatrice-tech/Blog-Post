

class Response{
    
      /**
 *Success Response
 * @params res, message, data, status 
 * @returns  status, message 
 */
    
    static successMessage(res, message, data= null, status){
        res.status(status).json(
            data?
            {
                status:status,
                message,
                data

            }
            :
            {
                status:status,
                message,
            })

    };
    static errorMessage(res, error, status){
        res.status(status).json(
            {
                status:status,
             error
                            
            })


}

}
export default Response;