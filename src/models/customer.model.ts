import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import Accident from './accident.model';

@Entity()
export default class Customer {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	role: string;

	@Column()
	name: string;

	@Column()
	birthday: string;

	@Column()
	cpf: string;

	@Column()
	email: string;

	@Column()
	password: string;

	@OneToMany(() => Accident, (accident) => accident.customer)
	accidents: Accident[];
}
