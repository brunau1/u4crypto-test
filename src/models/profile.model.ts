import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	OneToOne,
	JoinColumn,
} from 'typeorm';
import Customer from './customer.model';
import Third from './third.model';

@Entity()
export default class Profile {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	name: string;

	@Column()
	birthday: string;

	@Column()
	cpf: string;

	@Column()
	customerId: string;

	@Column()
	thirdId: string;
}
