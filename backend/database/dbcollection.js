import mongoose from "mongoose";

export const dbConnection =  () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "PDF_CHAT_BOT"
    }).then(() => {
        console.log("Database connected successfully");
    }).catch((err) => {
        console.log(err);
    });
}; 