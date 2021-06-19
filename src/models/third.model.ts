import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToMany,
	OneToOne,
	JoinColumn,
} from 'typeorm';
import Accident from './accident.model';

@Entity()
export default class Third {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	profileId: string;

	@ManyToMany((type) => Accident, (accident) => accident.third)
	accidents: Accident[];
}
