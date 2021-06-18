import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import Accident from './accident.model';

@Entity()
export default class Third {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	name: string;

	@Column()
	cpf: string;

	@Column()
	birthday: string;

	@ManyToMany((type) => Accident, (accident) => accident.third)
	accidents: Accident[];
}
