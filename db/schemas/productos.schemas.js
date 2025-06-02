import mongoose from 'mongoose';
const { Schema, model, models } = mongoose;

const UsuarioSchema = new Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, { timestamps: true });

const Usuario = models.Usuario || model("Usuario", UsuarioSchema);
export default Usuario;

