import { Router } from 'express';
import {
	register,
	login,
	logout,
	getProfile,
	deleteProfile,
	updateProfile,
} from '../controllers/user.controller';
import { verifyToken } from '../jwt/verifyToken';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/reset-password');
router.get('/profile', verifyToken, getProfile);
router.delete('/profile', verifyToken, deleteProfile);
router.put('/profile', verifyToken, updateProfile);

export default router;
