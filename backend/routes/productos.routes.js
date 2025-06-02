import { Router } from 'express';
import { createProd, findAll } from '../../db/actions/product.action.js';

const router= Router()

router.get('/all' ,async (req,res)=>{
    try{
        const result = await findAll()
        res.status(200).json(result)
    }catch(error){
        res.status(400).json
    }
})

router.get('/byId/:id',(req,res)=>{
    try{
        res.status(200).json()
    }catch(error){
        res.status(400).json()
    }
})

router.get('/byCategory/:Category',(req,res)=>{
    const category = req.params.category
    console.log(category)
    try{
        res.status(200).json()
    }catch(error){
        res.status(400).json()
    }
})

router.post('/create', async (req,res)=>{
    const{name, desc, stock, price } = req.body
    try{
        const result = await createProd(name, desc, stock, price)
        console.log(result)
        res.status(200).json(result)
    }catch(error){
        res.status(400).json()
    }
})

export default router