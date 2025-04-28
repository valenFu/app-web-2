import express from 'express';
import productosRoutes from './routes/productosRoutes.js';
import usuariosRoutes from './routes/usuariosRoutes.js';
import ventasRoutes from './routes/ventasRoutes.js';

const app = express();
const PORT = 3000;

// Middleware para trabajar con JSON
app.use(express.json());

// Usar las rutas
app.use('/productos', productosRoutes);
app.use('/usuarios', usuariosRoutes);
app.use('/ventas', ventasRoutes);

// Levantar el server
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});