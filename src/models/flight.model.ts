import mongoose from "mongoose";

const flightSchema = new mongoose.Schema({
    
} , {timestamps : true})

export const Flight = mongoose.model('Flight' , flightSchema)

