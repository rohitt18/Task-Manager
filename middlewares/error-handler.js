// Instead of looking for the func we're looking for the class bec in here i want to check if the instance 
// is equal to our custom erorr one then ofc ill pass in the status code & the error message however 
// if there is any other error then ofc we'll just go with the res.status(500) and whatever we had before

const { CustomAPIError } = require("../errors/custom-error");

const errorHandlerMiddleware = (err,req,res,next) => {
    if( err instanceof CustomAPIError){
        return res.status(err.statusCode).json({msg: err.message})
    }
    return res.status(500).json({ msg: "Something went wrong, please try again" })    // yaha pe voh ayega jo catch block mai likhte the
}

module.exports = errorHandlerMiddleware;