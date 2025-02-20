import { Request, Response } from 'express';
import { login } from '../controllers/authController';
import User from '../models/User';
import { verifyPassword } from '../utils/pwdUtils';
import { generateToken } from '../utils/JWTUtils';

// Mock des fonctions externes utilisées dans login
jest.mock('../models/User', () => ({
    __esModule: true, // ✅ pour gérer les imports par défaut
    default: {
        findOne: jest.fn()
    }
}));


jest.mock('../utils/pwdUtils', () => ({
    verifyPassword: jest.fn(),
}));

jest.mock('../utils/JWTUtils', () => ({
    generateToken: jest.fn()
}));

describe('🧪 Test de la fonction login', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let jsonMock: jest.Mock;
    let statusMock: jest.Mock;
    let cookieMock: jest.Mock;

    beforeEach(() => {
        jsonMock = jest.fn();
        statusMock = jest.fn().mockReturnValue({ json: jsonMock });
        cookieMock = jest.fn();
        req = {
            body: { name: 'john_doe', password: 'password123' }
        };
        res = {
            status: statusMock,
            json: jsonMock,
            cookie: cookieMock
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('✅ Connexion réussie', async () => {
        (User.findOne as jest.Mock).mockResolvedValue({
            _id: '12345',
            name: 'john_doe',
            hashedPassword: 'hashedPassword123'
        });

        (verifyPassword as jest.Mock).mockResolvedValue(true);
        (generateToken as jest.Mock).mockReturnValue('mockedToken');

        await login(req as Request, res as Response);

        expect(User.findOne).toHaveBeenCalledWith({ name: 'john_doe' });
        expect(verifyPassword).toHaveBeenCalledWith('password123', 'hashedPassword123');
        expect(generateToken).toHaveBeenCalledWith({ id: '12345', name: 'john_doe' });
        expect(cookieMock).toHaveBeenCalledWith('jwt', 'mockedToken', { httpOnly: true, sameSite: 'strict' });
        expect(statusMock).toHaveBeenCalledWith(200);
        expect(jsonMock).toHaveBeenCalledWith({ message: 'Login successful!' });
    });

    it('❌ Utilisateur non trouvé', async () => {
        (User.findOne as jest.Mock).mockResolvedValue(null);

        await login(req as Request, res as Response);

        expect(User.findOne).toHaveBeenCalledWith({ name: 'john_doe' });
        expect(statusMock).toHaveBeenCalledWith(404);
        expect(jsonMock).toHaveBeenCalledWith({ message: 'User not found.' });
    });

    it('🔐 Mot de passe invalide', async () => {
        (User.findOne as jest.Mock).mockResolvedValue({
            _id: '12345',
            name: 'john_doe',
            hashedPassword: 'hashedPassword123'
        });
        (verifyPassword as jest.Mock).mockResolvedValue(false);

        await login(req as Request, res as Response);

        expect(verifyPassword).toHaveBeenCalledWith('password123', 'hashedPassword123');
        expect(statusMock).toHaveBeenCalledWith(401);
        expect(jsonMock).toHaveBeenCalledWith({ message: 'Invalid credentials.' });
    });

    it('🔥 Erreur serveur', async () => {
        (User.findOne as jest.Mock).mockRejectedValue(new Error('Database error'));

        await login(req as Request, res as Response);

        expect(statusMock).toHaveBeenCalledWith(500);
        expect(jsonMock).toHaveBeenCalledWith({ message: 'Database error' });
    });
});
