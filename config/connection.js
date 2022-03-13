const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI || "Mongodb://localhost/socialmedia", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFineAndModify: false 
});

module.exports = mongoose.connection;