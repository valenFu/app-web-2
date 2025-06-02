import fs from 'fs';
import path from 'path';
import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  const filePath = path.join(path.resolve(), 'datos', 'productos.json');

  if (fs.existsSync(filePath)) {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        return res.status(500).json({ mensaje: 'Error al leer el archivo' });
      }
      const productos = JSON.parse(data);
      res.json(productos);
    });
  } else {
    res.status(404).json({ mensaje: 'Archivo de productos no encontrado' });
  }
});

export default router;
