import { IsNotEmpty } from 'class-validator';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne
} from 'typeorm';

import { User } from './User';
import { Activity } from './Activity';

@Entity()
export class Interest {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({
        name: 'user_id',
        nullable: true,
    })
    public userId: number;

    @OneToOne(type => Activity)
    @JoinColumn({ name: 'activity_id' })
    public activity: Activity;

    @Column({
        name: 'activity_id',
        nullable: true,
        unique: true,
    })
    public activityId: number;

    @Column()
    public shared: boolean;

    @Column()
    public calendar: boolean;

    @Column()
    public hours: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    public createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    public updatedAt: Date;

    @Column({ name: 'deleted_at', nullable: true })
    public deletedAt: Date;

    @ManyToOne(type => User, user => user.id)
    @JoinColumn({ name: 'user_id' })
    public user: User;

    public toString(): string {
        return `Interest #${this.id}, user #${this.userId}`;
    }
}
