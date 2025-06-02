import mongoose from 'mongoose';
const { Schema, model, models } = mongoose;

const VentaSchema = new Schema({
  productos: [{
    nombre: String,
    cantidad: Number,
    precio: Number
  }],
  total: { type: Number, required: true },
  usuarioId: { type: Schema.Types.ObjectId, ref: "Usuario" },
  fecha: { type: Date, default: Date.now }
}, { timestamps: true });

const Venta = models.Venta || model("Venta", VentaSchema);
export default Venta;

