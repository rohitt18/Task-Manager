// Here, i want to create my custom Error class & extend it from the JavaScript Error Class.

class CustomAPIError extends Error{
    constructor(message,statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

// And essentially we can create new instance by new CusCustomAPIError(msg, statusCode);
// But I actually like to setup a new function that does that for me  

const createCustomError = (msg, statusCode) => {
    return new CustomAPIError(msg,statusCode);
}

// A constructor method is a special method we invoke when we create a new instance of a class
// And in our case we'll pass in 2 arguments, an error message & a statusCode
// Since we're extending means we're setting up a child class we need to call super method which in turn invokes a constructor of a parent class and in our case we pass in our message value
// As a result we'll have access to all the methods and properties of the parent so in our instance we'll have the message property
// And with this.statusCode we create a statusCode property as well

module.exports = { createCustomError,CustomAPIError };

// we need to export the function as well as the class.