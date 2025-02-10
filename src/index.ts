import express from 'express';

import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express'
import testRoutes from './routes/testRoutes';
import swaggerDocs from './config/swagger';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import mongoose from 'mongoose';
import cors from 'cors';


const app = express();

//chargement des variables d'environnement
dotenv.config();

const PORT = process.env.PORT;
console.log("test")

app.use(express.json());

// Activer CORS uniquement pour une seule origine
//curl ifconfig.me pour connaître l'ip publique de votre pc
const corsOptions = {
    origin: process.env.CLIENT_URL || "http://localhost:4200", // Placer le domaine du client pour l'autoriser
    methods: 'GET,POST,DELETE,PUT', // Restreindre les méthodes autorisées
    allowedHeaders: 'Content-Type,Authorization', // Définir les en-têtes acceptés
    credentials: true // Autoriser les cookies et les headers sécurisés
};

app.use(cors(corsOptions));



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
    console.log(`Server is running on ${process.env.API_URL}:${PORT}`);
});
