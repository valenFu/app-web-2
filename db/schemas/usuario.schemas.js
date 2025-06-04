import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema, model, models } = mongoose;

const UsuarioSchema = new Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contraseña: { type: String, required: true }
});

UsuarioSchema.pre('save', async function (next) {
  if (!this.isModified('contraseña')) return next();
  const salt = await bcrypt.genSalt(10);
  this.contraseña = await bcrypt.hash(this.contraseña, salt);
  next();
});

UsuarioSchema.methods.compararContraseña = async function (contraseñaIngresada) {
  return await bcrypt.compare(contraseñaIngresada, this.contraseña);
};

const Usuario = models.Usuario || model("Usuario", UsuarioSchema);

export default Usuario;



