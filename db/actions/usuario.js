import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  contraseña: {
    type: String,
    required: true,
    minlength: 6
  },
}, { timestamps: true });

// Middleware para hashear la contraseña antes de guardar
usuarioSchema.pre('save', async function(next) {
  if (!this.isModified('contraseña')) return next();
  const salt = await bcrypt.genSalt(10);
  this.contraseña = await bcrypt.hash(this.contraseña, salt);
  next();
});

// Método para comparar contraseñas al hacer login
usuarioSchema.methods.compararContraseña = async function(contraseñaFormulario) {
  return await bcrypt.compare(contraseñaFormulario, this.contraseña);
};

const Usuario = mongoose.model('Usuario', usuarioSchema);

export default Usuario;
