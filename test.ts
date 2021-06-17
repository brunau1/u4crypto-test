require('dotenv-safe').config();
import * as Jwt from 'jsonwebtoken';

const { JWT_SECRET, JWT_EXPIRATION } = process.env;
const token = Jwt.sign(
	{ id: 'customerInfo.id', role: 'customerInfo.role' },
	JWT_SECRET,
	{
		algorithm: 'HS256',
		expiresIn: JWT_EXPIRATION,
	}
);
const decoded = Jwt.decode(token);
console.log(decoded.role);
