import express from 'express';
import multer from 'multer';
import Producto from '../db/schemas/productos.schemas.js';
import fs from 'fs';

const router = express.Router();

// Crear carpeta 'uploads' si no existe
const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configurar multer para guardar en disco
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const nombreUnico = Date.now() + '-' + file.originalname;
    cb(null, nombreUnico);
  }
});

const upload = multer({ storage });

// Ruta para crear producto
router.post('/create', upload.single('imagen'), async (req, res) => {
  try {
    const { categoria, nombre, descripcion, precio, stock } = req.body;
    const imagen = req.file ? req.file.filename : null;

    if (!imagen) {
      return res.status(400).json({ mensaje: 'La imagen es requerida.' });
    }

    const nuevoProducto = new Producto({
      categoria,
      nombre,
      descripcion,
      precio,
      stock,
      imagen // Guarda solo el nombre del archivo
    });

    await nuevoProducto.save();
    res.status(201).json({ mensaje: 'Producto creado con éxito.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear producto.', error });
  }
});

// Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener productos', error });
  }
});

// Obtener productos por categoría (insensible a mayúsculas/minúsculas)
router.get('/categoria/:categoria', async (req, res) => {
  try {
    const categoria = req.params.categoria;
    const productos = await Producto.find({
      categoria: { $regex: new RegExp(`^${categoria}$`, 'i') }
    });
    res.json(productos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener productos por categoría', error });
  }
});

export default router;


