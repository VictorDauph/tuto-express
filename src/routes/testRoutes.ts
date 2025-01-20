import express from 'express';
import { protectedTest, test, test2 } from '../controllers/testController';
import { verifyTokenMiddleware } from '../middlewares/verifyTokenMiddleware';



const router = express.Router();

/**
 * @swagger
 * /test:
 *   get:
 *     summary: Test route
 *     description: Retourne un simple message de test
 *     responses:
 *       200:
 *         description: Succès
 */
router.get('/', test);


/**
 * @swagger
 * /test:
 *   post:
 *     summary: Effectue une action POST
 *     description: Cette route effectue une action POST en recevant des données dans le corps de la requête.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               test:
 *                 type: string
 *                 description: Le nom de l'utilisateur
 *                 example: test
 *     responses:
 *       200:
 *         description: Requête réussie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message de succès
 *                   example: "Action POST réussie"
 *                 data:
 *                   type: object
 *                   description: Les données reçues
 *                   example:
 *                     name: John Doe
 *                     age: 30
 *       400:
 *         description: Requête invalide (par exemple, données manquantes ou incorrectes)
 */
router.post('/', test2);


router.get('/protected', verifyTokenMiddleware, protectedTest)

export default router;