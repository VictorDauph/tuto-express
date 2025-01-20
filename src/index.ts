import express from 'express';
import testRoutes from './routes/testRoutes'
import userRoutes from './routes/userRoutes'
import mongoose from 'mongoose';
import swaggerDocs from './config/swagger';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';

const app = express();
const swaggerUi = require('swagger-ui-express');

//chargement des variables d'environnement
dotenv.config();

const PORT = process.env.PORT;
console.log("test")

app.use(express.json());

// Connecter MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
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

// Routes d'authentification
app.use('/auth', authRoutes);

// Swagger route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
