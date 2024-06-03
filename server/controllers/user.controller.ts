import { request, response } from 'express';
import User from '../models/User';
import { User as UserInterface } from '../interfaces/User';
import { AxiosError } from 'axios';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

const register = async (req = request, res = response) => {
	const { email, password }: UserInterface = req.body;

	try {
		const userFound = await User.findOne<User>({ where: { email } });
		if (userFound) {
			return res.status(404).json({ message: 'User already exits' });
		}

		const passwordHash = await bcrypt.hash(password, 10);

		const user = await User.create<User>({ ...req.body, password: passwordHash });
		if (!process.env.SECRET_KEY) {
			return res.status(500).json({ message: 'Error: SECRET_KEY not defined' });
		}

		if (!user) {
			return res.status(500).json({ message: 'Error could not create user' });
		}
		const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
			algorithm: 'HS256',
			expiresIn: '1d',
		});
		res.cookie('token', token, {
			httpOnly: true,
			sameSite: true,
		});
		return res.status(200).json({
			user,
		});
	} catch (error: unknown) {
		if (error instanceof AxiosError) {
			return res.status(404).json({ message: error.response?.data });
		}
		return res.status(500).json({ error: 'Error unknown' });
	}
};

const login = async (req = request, res = response) => {
	const { email, password }: UserInterface = req.body;
	try {
		const userFound = await User.findOne({ where: { email } });
		if (!userFound) {
			return res.status(404).json({ message: 'Email not found' });
		}
		const passwordVerify = await bcrypt.compare(password, userFound.password);

		if (!passwordVerify) {
			return res.status(404).json({ message: 'password incorrect' });
		}
		const token = jwt.sign({ id: userFound.id }, process.env.SECRET_KEY!, {
			expiresIn: '1d',
		});
		res.cookie('token', token, {
			httpOnly: true,
			maxAge: 24 * 60 * 60 * 1000,
			secure: true,
		});
		return res.status(200).json(userFound);
	} catch (error: unknown) {
		if (error instanceof AxiosError) {
			return res.status(404).json({ message: error.response?.data });
		}
		return res.status(500).json({ error: 'Error unknown' });
	}
};

const logout = async (req = request, res = response) => {
	try {
		res.clearCookie('token');
		return res.status(200).json({ message: 'logout' });
	} catch (error: unknown) {
		if (error instanceof AxiosError) {
			return res.status(404).json({ message: error.response?.data });
		}
		return res.status(500).json({ message: 'Error unknown' });
	}
};

const getProfile = async (req = request, res = response) => {
	const { userId } = req.body;

	try {
		const user = await User.findOne({ where: { id: userId } });
		if (!user) {
			return res.status(404).json({ message: 'user not found' });
		}

		return res.status(200).json(user);
	} catch (error: unknown) {
		if (error instanceof AxiosError) {
			return res.status(404).json({ message: error.response?.data });
		}
		return res.status(500).json({ message: 'Error unknown' });
	}
};

const deleteProfile = async (req = request, res = response) => {
	const { userId } = req.body;
	try {
		const userDelete = await User.findByPk(userId);
		userDelete?.destroy();
		return res.status(200).json({ message: 'Delete success' });
	} catch (error: unknown) {
		if (error instanceof AxiosError) {
			return res.status(404).json({ message: error.response?.data });
		}
		return res.status(500).json({ message: 'Error unknown' });
	}
};

const updateProfile = async (req = request, res = response) => {
	const { userId, name, email } = req.body;
	try {
		const user = await User.findByPk<any>(userId);

		if (user) {
			// Actualiza los valores del usuario
			user.email = email;
			user.name = name;

			// Guarda los cambios en la base de datos
			await user?.save();

			return res.status(200).json(user);
		} else {
			return res.status(404).json({ message: 'User not found' });
		}
	} catch (error: unknown) {
		if (error instanceof AxiosError) {
			return res.status(404).json({ message: error.response?.data });
		}
		return res.status(500).json({ message: 'Error unknown' });
	}
};
export { register, login, logout, getProfile, deleteProfile, updateProfile };
