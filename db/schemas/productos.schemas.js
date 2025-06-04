import mongoose from 'mongoose';
const { Schema, model, models } = mongoose;

const ProductoSchema = new Schema({
  nombre: { type: String, required: true },
  categoria: { type: String, required: true },
  descripcion: { type: String, required: true },
  precio: { type: Number, required: true },
  imagen: { type: String },
  stock: { type: Number, required: true }
}, { timestamps: true });

const Producto = models.Producto || model('Producto', ProductoSchema);
export default Producto;

