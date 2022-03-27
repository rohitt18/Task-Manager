const mongoose = require("mongoose");


const connectDB = (url) => {
  return mongoose.connect(url, {
    useNewUrlParser: true, // to remove those deprecation warnings...
    useCreateIndex: true, // if you're using mongoose version 6 then you dont need to do this
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
};

module.exports = connectDB;
