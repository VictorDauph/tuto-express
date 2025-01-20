import express from 'express';
import { login, register } from '../controllers/authController';

const router = express.Router();

//requête de login
router.post('/login', login)

//creéation utilisateur
router.post('/register', register);

export default router;