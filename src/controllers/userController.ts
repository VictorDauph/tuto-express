import { Request, Response } from "express";
import User, { IUser } from "../models/User";
import { hashPassword } from "../utils/pwdUtils";

export async function getAllUsers(req: Request, res: Response) {

    let users = await User.find();
    users.forEach(user => user.hashedPassword = "");
    res.send(users)
}


export async function modifyUser(req: Request, res: Response) {
    try {
        const { id } = req.params; // Récupérer l'ID depuis les paramètres de la requête
        const { name, email, age } = req.body; // Récupérer les nouvelles données depuis le corps de la requête

        // Validation des champs 
        if (!id) {
            res.status(400).json({ message: 'ID requis pour mettre à jour un utilisateur' });
            return
        }

        if (!name && !email && !age) {
            res.status(400).json({ message: 'Au moins un champ doit être fourni pour la mise à jour' });
            return
        }

        // Mise à jour des champs
        const updatedUser = await User.findByIdAndUpdate(
            id, // ID de l'utilisateur à mettre à jour
            { name, email, age }, // Champs à mettre à jour
            { new: true, runValidators: true } // Options : retourner le nouvel utilisateur et valider les données
        );

        if (!updatedUser) {
            res.status(404).json({ message: 'Utilisateur non trouvé' });
            return
        }

        // Réponse réussie
        res.status(200).json({ message: 'Utilisateur mis à jour avec succès', data: updatedUser });
    } catch (err: any) {
        // Gestion des erreurs
        if (err.code === 11000) {
            // Erreur de duplication (email unique par exemple)
            res.status(400).json({ message: 'Cet email est déjà utilisé' });
            return
        }

        res.status(500).json({ message: 'Erreur interne', error: err.message });
    }
}

export async function deleteUser(req: Request, res: Response) {
    try {
        const { id } = req.params;

        // Vérification de la présence de l'ID
        if (!id) {
            res.status(400).json({ message: 'ID requis pour supprimer un utilisateur' });
            return
        }

        // Suppression de l'utilisateur
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            res.status(404).json({ message: 'Utilisateur non trouvé' });
            return
        }

        // Réponse réussie
        res.status(200).json({ message: 'Utilisateur supprimé avec succès', data: deletedUser });
        return
    } catch (err: any) {
        // Gestion des erreurs
        res.status(500).json({ message: 'Erreur interne', error: err.message });
        return
    }

}
