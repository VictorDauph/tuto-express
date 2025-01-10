import express from 'express';
import { test, test2 } from '../controllers/testController';
import { createUser, deleteUser, getAllUsers, modifyUser } from '../controllers/userController';


const router = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: getAllUsers
 *     description: Retourne la liste de tous les users
 *     responses:
 *       200:
 *         description: Succès
 */
router.get('/', getAllUsers);


/**
 * @swagger
 * /users:
 *   post:
 *     summary: createUser
 *     description: Cette route créé un nouvel user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Le nom de l'utilisateur
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 description: L'email de l'utilisateur
 *                 example: "John@gmail.com"
 *               age:
 *                 type: number
 *                 description: L'âge de l'utilisateur
 *                 example: 30
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message de succès
 *                   example: "Utilisateur créé avec succès"
 *                 data:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: "John Doe"
 *                     email:
 *                       type: string
 *                       example: "John@gmail.com"
 *                     age:
 *                       type: number
 *                       example: 30
 *       400:
 *         description: Requête invalide
 */
router.post('/', createUser);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Modifier un utilisateur
 *     description: Cette route permet de modifier les informations d'un utilisateur existant.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'utilisateur à modifier
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Le nouveau nom de l'utilisateur
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 description: Le nouvel email de l'utilisateur
 *                 example: john.doe@example.com
 *               age:
 *                 type: number
 *                 description: Le nouvel âge de l'utilisateur
 *                 example: 30
 *     responses:
 *       200:
 *         description: Utilisateur mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Utilisateur mis à jour avec succès
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 64b8c02959d9b437b9a8b5d1
 *                     name:
 *                       type: string
 *                       example: John Doe
 *                     email:
 *                       type: string
 *                       example: john.doe@example.com
 *                     age:
 *                       type: number
 *                       example: 30
 *       400:
 *         description: Requête invalide
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Au moins un champ doit être fourni pour la mise à jour"
 *       404:
 *         description: Utilisateur non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Utilisateur non trouvé
 *       500:
 *         description: Erreur interne
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Erreur interne
 *                 error:
 *                   type: string
 *                   description: Détails de l'erreur
 */
router.put('/:id', modifyUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Supprimer un utilisateur
 *     description: Cette route permet de supprimer un utilisateur en fournissant son ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID de l'utilisateur à supprimer
 *     responses:
 *       200:
 *         description: Utilisateur supprimé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Utilisateur supprimé avec succès"
 *                 data:
 *                   type: object
 *                   description: Les détails de l'utilisateur supprimé
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: L'ID de l'utilisateur supprimé
 *                       example: 64b8c02959d9b437b9a8b5d1
 *                     name:
 *                       type: string
 *                       example: John Doe
 *                     email:
 *                       type: string
 *                       example: john.doe@example.com
 *                     age:
 *                       type: number
 *                       example: 30
 *       400:
 *         description: ID requis pour supprimer un utilisateur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "ID requis pour supprimer un utilisateur"
 *       404:
 *         description: Utilisateur non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Utilisateur non trouvé"
 *       500:
 *         description: Erreur interne du serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erreur interne"
 *                 error:
 *                   type: string
 */
router.delete('/:id', deleteUser);

export default router;