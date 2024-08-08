import mongoose from "mongoose";

const dbConnection =  () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "fifthtech",
    }).then(() => {
        console.log("Database connected successfully");
    }).catch((err) => {
        console.log(err);
    });
}; 

export default dbConnection;