import express from 'express';
import Producto from '../db/schemas/productos.schema.js';

const router = express.Router();

// Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener productos', error });
  }
});

// Obtener productos por categoría (opcional)
router.get('/categoria/:categoria', async (req, res) => {
  try {
    const categoria = req.params.categoria;
    const productos = await Producto.find({ categoria });
    res.json(productos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener productos por categoría', error });
  }
});

export default router;

