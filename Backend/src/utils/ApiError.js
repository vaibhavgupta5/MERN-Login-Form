class ApiError extends Error{
    constructor(message, statusCode = "Something Went Wrong", error=[], stack="") {
        super(message);
        this.statusCode = statusCode;
        this.error = error;
        this.stack = stack;
        this.message = message;
        this.success = false


        if(stack){
            this.stack = stack
        }
        else{
            Error.captureStackTrace(this, this.constructor);
        }

    }
}

export default ApiError