import {
	BeforeInsert,
	BeforeUpdate,
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

export class BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@CreateDateColumn({ type: 'timestamp' })
	createdAt: number;

	@UpdateDateColumn({ type: 'timestamp' })
	updatedAt: number;

	@DeleteDateColumn({ type: 'timestamp', select: false })
	deletedAt: number;

	@Column({
		type: 'enum',
		enum: [1, 2],
		default: 1,
	})
	status: number; // 1启用，2暂停

	@BeforeInsert()
	handleBeforeInsert() {
		console.log('BeforeInsert---------');
	}

	@BeforeUpdate()
	handleBeforeUpdate() {
		console.log('BeforeUpdate---------');
	}
}
