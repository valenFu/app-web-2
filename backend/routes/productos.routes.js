import { Router } from 'express';
import { createProd, findAll, findById, findByCategory } from '../../db/actions/product.action.js';
import multer from 'multer';
import fs from 'fs';

const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const upload = multer({ storage });

const router = Router();

router.get('/all', async (req, res) => {
  try {
    const result = await findAll();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener productos', error });
  }
});

router.get('/byId/:id', async (req, res) => {
  try {
    const producto = await findById(req.params.id);
    res.status(200).json(producto);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener producto por ID', error });
  }
});

router.get('/byCategory/:category', async (req, res) => {
  try {
    const categoria = req.params.category;
    // Usar la función que tienes importada, si existe:
    const productos = await findByCategory(categoria);
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener productos por categoría', error });
  }
});

router.post('/create', upload.single('imagen'), async (req, res) => {
  const { nombre, descripcion, precio, categoria, stock } = req.body;
  const imagen = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const producto = await createProd({ nombre, descripcion, precio, categoria, imagen, stock });
    res.status(201).json({ mensaje: 'Producto creado con éxito', producto });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear producto', error });
  }
});

export default router;

