import { Router } from 'express';

const router= Router()

router.get('/all',(req,res)=>{
    try{
        res.status(200).json()
    }catch(error){
        res.status(400).json()
    }
})

router.post('/create',(req,res)=>{
    const {} = req.body
    try{
        res.status(200).json()
    }catch(error){
        res.status(400).json()
    }
})

export default router