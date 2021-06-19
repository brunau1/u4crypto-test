import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	OneToMany,
	JoinColumn,
	OneToOne,
} from 'typeorm';
import Accident from './accident.model';
import Profile from './profile.model';

@Entity()
export default class Customer {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	role: string;

	@Column()
	email: string;

	@Column()
	password: string;

	@Column()
	profileId: string;

	@OneToMany(() => Accident, (accident) => accident.customer)
	accidents: Accident[];
}
