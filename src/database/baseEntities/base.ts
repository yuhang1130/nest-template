import {
	BeforeInsert,
	BeforeUpdate,
	Column,
	CreateDateColumn,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { ENTITY_STATUS } from '../../constants/entities-constant';

export class BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@CreateDateColumn({ type: 'timestamp' })
	create_time: number;

	@UpdateDateColumn({ type: 'timestamp' })
	updated_time: number;

	@Column({ type: 'number', nullable: true })
	create_user_id: number;

	@Column({ type: 'number', nullable: true })
	update_user_id: number;

	@Column({
		type: 'enum',
		enum: ENTITY_STATUS,
		default: ENTITY_STATUS.NORMAL,
	})
	status: number = ENTITY_STATUS.NORMAL;

	@BeforeInsert()
	handleBeforeInsert() {
		console.log('BeforeInsert---------');
		this.create_user_id = 123;
	}

	@BeforeUpdate()
	handleBeforeUpdate() {
		console.log('BeforeUpdate---------');
		this.update_user_id = 456;
	}
}
