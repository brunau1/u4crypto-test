import { createConnection } from 'typeorm';
import config from './config';

export async function connect() {
	await createConnection(config);
}
