import mongoose from 'mongoose'

interface ICar {
  name: string;
  brand: string;
  seats: number;
  color: string;
}

interface CarModelInterface extends mongoose.Model<CarDoc> {
  build(attr: ICar): CarDoc
}

interface CarDoc extends mongoose.Document {
  name: string;
  brand: string;
  seats: number;
  color: string;
}

const carSchema = new mongoose.Schema({
  name: {
    type: String, 
    required: true
  },
  brand: {
    type: String, 
    required: true
  },
  seats: {
    type: Number, 
    required: false
  },
  color: {
    type: String, 
    required: false
  }
})

carSchema.statics.build = (attr: ICar) => {
  return new Car(attr)
}

const Car = mongoose.model<CarDoc, CarModelInterface>('cars', carSchema)

export { Car }