import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import Accident from './accident.model';

@Entity()
export default class ThirdCustomer {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	name: string;

	@Column()
	birthday: string;

	@Column()
	cpf: string;

	@ManyToMany((type) => Accident, (accident) => accident.thirdCustomers)
	accidents: Accident[];
}
