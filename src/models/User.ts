import mongoose, { Schema, Document } from 'mongoose';

// Interface TypeScript pour le document utilisateur
export interface IUser extends Document {
    name: string;
    email: string;
    age: number;
}

// Définir le schéma Mongoose
const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
});

// Exporter le modèle
export default mongoose.model<IUser>('User', UserSchema);
