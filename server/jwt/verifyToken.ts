import { request, response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const verifyToken = async (
	req = request,
	res = response,
	next: NextFunction
) => {
	const { token } = req.cookies;

	if (!token) {
		return res.status(404).json({ message: 'No token provided' });
	}
	//verify token
	const user = jwt.verify(token, process.env.SECRET_KEY!) as JwtPayload;
	if (!user) {
		return res.status(401).json({ message: 'Unauthorized' });
	}
	req.body.userId = user.id as string;

	next();
};
