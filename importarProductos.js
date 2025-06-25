import { connectToDatabase } from '../db/conexion.js'; 
import Producto from '../db/schemas/productos.schema.js';
import fs from 'fs';
const productos = JSON.parse(fs.readFileSync('../frontend/datos/Productos.json', 'utf-8'));

// Esta función importa los productos del archivo JSON a MongoDB
async function importarProductos() {
  try {
    await connectToDatabase();

    // Opcional: eliminar productos anteriores
    await Producto.deleteMany();

    // Insertar productos desde el JSON
    await Producto.insertMany(productos);

    console.log('Productos importados con éxito');
    process.exit(); // Finaliza el proceso
  } catch (error) {
    console.error('Error al importar productos:', error);
    process.exit(1);
  }
}

importarProductos();
