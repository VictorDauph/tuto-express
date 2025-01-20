import mongoose, { Schema, Document } from 'mongoose';

// Interface TypeScript pour le document utilisateur
export interface IUser extends Document {
    name: string;
    hashedPassword: string,
    email: string;
    age: number;
    addedAt: Date;
}

// Définir le schéma Mongoose
const UserSchema: Schema = new Schema({
    name: { type: String, required: true, unique: true },
    hashedPassword: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    addedAt: { type: Date, default: Date.now } // Date d'ajout par défaut à l'instant présent
});

// Exporter le modèle
export default mongoose.model<IUser>('User', UserSchema);
