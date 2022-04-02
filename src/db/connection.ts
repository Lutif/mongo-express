import mongoose from "mongoose";
import {defaultMongoUrl} from '../utils'
const mongoUrl = process.env.MONGO_URL ||defaultMongoUrl

export const connectdb = async () =>{
  try {
    await mongoose.connect(mongoUrl)
    console.log(`🚀 Connected to mongo database`);

  } catch (error) {
    console.log(`failed to connect mongodb with url: ${mongoUrl}`, error)
  }
}