import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import cors from "cors";
import itemRouter from "./routers/items.router";
import userRouter from "./routers/user.router";

import { dbConnect } from './configs/database.config';
dbConnect();

const app = express();
app.use(express.json());

app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"]
}));

const port = 5000;
app.listen(port, ()=>{
    console.log("website served on http://localhost:" + port);
})

app.use("/api/items", itemRouter);
app.use("/api/users", userRouter);






