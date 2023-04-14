import express from 'express'
import colors from 'colors';
import dotenv from 'dotenv';
import cors from 'cors';
import parser from 'body-parser';
import connectDB from './config/db.js';
import morgan from 'morgan';
import authRouter from './routes/authRoute.js'
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
//import http from 'http';
//import { Server } from  'socket.io';



const app=express()



dotenv.config()

app.use(parser.json())
app.use(cors());
app.use(morgan('dev'));

connectDB();



//routes
app.use('/api/v1/auth',authRouter);
app.use('/api/v1/category',categoryRoutes);
app.use('/api/v1/product',productRoutes);



app.get('/',(req,res)=>{
    res.send('<h1>Welcome to ecommerce app</h1>')
})

const PORT=process.env.PORT || 8080;

//const server = http.createServer(app);

////const io = new Server(server,{
   // cors: {
       // origin: "http://localhost:3000",
        //methods: ["POST","GET","PUT","DELETE"]
    //}
//})

//io.on("connection",(socket)=>{
 //console.log(`User Connected: ${socket.id}`)
//})

app.listen(PORT,()=>{
    console.log('Server is running'.bgCyan.white)
})