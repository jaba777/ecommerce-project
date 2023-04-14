import mongoose from 'mongoose';
import colors from 'colors';
import dotenv from 'dotenv';

dotenv.config();


const url=process.env.MONGO_URL;


const connectDB= async ()=>{
    try {
        const conn = await mongoose.connect(url);
        console.log(`mongo connect ${conn.connection.host}`.bgMagenta.white)
    } catch (error) {
        console.log('error'.red);
    }
}


export default connectDB;