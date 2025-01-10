import express from 'express';
import testRoutes from './routes/testRoutes'
import userRoutes from './routes/userRoutes'
import mongoose from 'mongoose';
import swaggerDocs from './config/swagger';

const app = express();
const swaggerUi = require('swagger-ui-express');
const PORT = 3000;
console.log("test")

app.use(express.json());

// Connecter MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://mongodb:27017/my_database');
        console.log('MongoDB connecté avec succès');
    } catch (err) {
        console.error('Erreur lors de la connexion à MongoDB:', err);
        process.exit(1);
    }
};

connectDB();

//Routes
app.use('/test', testRoutes)
app.use('/users', userRoutes)

// Swagger route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
