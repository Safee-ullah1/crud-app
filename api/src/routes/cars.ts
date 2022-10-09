import express, { Request, Response } from 'express'
import { Car } from '../models'

const router = express.Router()

router.get('/car/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  const car = await Car.find({_id:id})
  return res.status(200).send(car)
})

router.get('/car', async (req: Request, res: Response) => {
  const car = await Car.find(req.query)
  return res.status(200).send(car)
})
router.get('/', async (req: Request, res: Response) => {
  return res.status(200).send(req.query)
})

router.post('/car', async (req: Request, res: Response) => {
  const { name, brand, seats, color } = req.body;

  const car = Car.build({ name, brand, seats, color })
  await car.save()
  return res.status(201).send(car)
})
router.put('/car', async (req: Request, res: Response) => {
  const { filter, update } = req.body;
  console.log(filter, update)
  Car.findOneAndUpdate(filter, update, {}, 
    (result)=>{
    console.log(result);
    return res.status(201).send(result);
  })
})
router.delete('/car', async (req: Request, res: Response) => {
  const filter = req.body;

  Car.findOneAndDelete(filter, {}, (result)=>{
    console.log(result);
    return res.status(201).send(result);
  })
  
})

export { router as carRouter }