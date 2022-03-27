const mongoose = require("mongoose");


// using Schema we'll set up the structure for all the documents that eventually we'll have in our collection 
// and the syntax is following where again we use key:value pairs & eventually we'll set them equal to an object & we'll pass in more options
const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "must provide name"],           // these are called the built-in validators
        trim: true,
        maxlength: [20, "name cannot be more than 20 characters"],
    },
    completed: {
        type: Boolean,
        default: false,
        
    }
})

// Think of Model as a representation for the collection

module.exports = mongoose.model('Task', TaskSchema);


// The first argument is the singular name of the collection your model is for.
// Mongoose automatically looks for the plural, lowercased version of your model name
// *** WHICH MEANS AGAR MODEL NAME Task hai toh collection ka naam automatically tasks set ho jayega

