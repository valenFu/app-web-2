import mongoose from 'mongoose';
import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import Producto from '../db/schemas/productos.schemas.js';

const rutaJSON = path.join('..', 'frontend', 'datos', 'productos.json');

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Conectado a MongoDB');

    const data = fs.readFileSync(rutaJSON, 'utf-8');
    const productos = JSON.parse(data);

    await Producto.deleteMany(); // Limpia colección si ya tenía datos
    await Producto.insertMany(productos);

    console.log('Productos importados con éxito');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Error al importar productos:', err);
    process.exit(1);
  });

