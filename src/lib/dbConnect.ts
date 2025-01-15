import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

type ConnecionObject = {
    isConnected?: number 
}

const connection : ConnecionObject = {};

async function dbConnect(): Promise<void>{
    if(connection.isConnected){
        console.log("Already connected to database");
        return
    }
    try{
        const db = await mongoose.connect(MONGODB_URI || '', {})
        connection.isConnected = db.connections[0].readyState
        console.log("DB connected succesfully");
    }catch (error) { 
        console.log("Database connection failed", error)
        process.exit(1)
    }
}

export default dbConnect;
