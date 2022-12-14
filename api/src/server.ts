import express from 'express';
import mongoose from 'mongoose'
import { json } from 'body-parser';
import { carRouter } from './routes'
import cors from "cors"
const app = express()
app.use(cors({
  origin:"*",
  methods:['GET','POST','PATCH','DELETE','PUT'],
  allowedHeaders:'Content-Type, Authorization, Origin, X-Requested-With, Accept'
})); 
app.use(json())
app.use(carRouter)

mongoose.connect('mongodb://0.0.0.0:27017/crud-test')
.then(result => {
  console.log("Connected to DB.")
})
.catch(error=>{
  console.log(error)
})
app.listen(3000, () => {
  console.log('server is listening on port 3000')
})