import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	JoinColumn,
	ManyToOne,
	ManyToMany,
	JoinTable,
} from 'typeorm';
import Customer from './customer.model';
import ThirdCustomer from './thirdCustomer.model';

@Entity()
export default class Accident {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	vehiclePlate: string;

	@Column()
	vehicleModel: string;

	@Column()
	reason: string;

	@ManyToOne(() => Customer, (customer) => customer.accidents)
	@JoinColumn()
	customer: Customer;

	@ManyToMany(
		(type) => ThirdCustomer,
		(thirdCustomer) => thirdCustomer.accidents,
		{
			cascade: true,
		}
	)
	@JoinTable()
	thirdCustomers: ThirdCustomer[];
}
