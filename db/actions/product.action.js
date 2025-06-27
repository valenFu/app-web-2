import { connectToDatabase } from "../conexion.js";
import Product from "../schemas/productos.schemas.js";

// Crear un nuevo producto
export const createProd = async ({ nombre, descripcion, precio, imagen, categoria, stock }) => {
  try {
    await connectToDatabase();
    const res = await Product.create({ nombre, descripcion, precio, imagen, categoria, stock });
    return JSON.parse(JSON.stringify(res));
  } catch (error) {
    console.error("Error al crear producto:", error);
  }
};

// Corregido: nombre correcto de la función
export const findAll = async () => {
  try {
    await connectToDatabase();
    const res = await Product.find();
    return JSON.parse(JSON.stringify(res));
  } catch (error) {
    console.error("Error en findAll:", error);
  }
};

// Opcional si usás /byId/:id
export const findById = async (id) => {
  try {
    await connectToDatabase();
    const res = await Product.findById(id);
    return JSON.parse(JSON.stringify(res));
  } catch (error) {
    console.error("Error en findById:", error);
  }
};

// Opcional si usás /byCategory/:category
export const findByCategory = async (categoria) => {
  try {
    await connectToDatabase();
    const res = await Product.find({ categoria });
    return JSON.parse(JSON.stringify(res));
  } catch (error) {
    console.error("Error en findByCategory:", error);
  }
};
