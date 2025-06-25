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

router.post('/create', async (req, res) => {
  const { nombre, descripcion, stock, precio, imagen, categoria } = req.body;

  try {
    const nuevoProducto = await createProd({
      nombre,
      descripcion,
      stock,
      precio,
      imagen,
      categoria
    });

    res.status(201).json(nuevoProducto);
  } catch (error) {
    console.error('Error al crear producto:', error);
    res.status(400).json({ mensaje: 'Error al crear producto', error });
  }
});

export default router