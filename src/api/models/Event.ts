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
export class Event {

    @PrimaryGeneratedColumn()
    public id: number;

    // @Column({
    //     name: 'user_id',
    //     nullable: true,
    // })
    // public userId: number;

    // @Column({
    //     name: 'activity_id',
    //     nullable: true,
    // })
    // public activityId: number;

    @ManyToOne(type => User, user => user.id)
    @JoinColumn({ name: 'users' })
    @Column()
    public users: User;

    @ManyToOne(type => User, user => user.id)
    @JoinColumn({ name: 'accepted_users' })
    @Column({ name: 'accepted_users'})
    public acceptedUsers: User;

    @OneToOne(type => User)
    @JoinColumn({ name: 'creator' })
    @Column()
    public creator: User;

    @OneToOne(type => Activity)
    @JoinColumn({ name: 'activity' })
    public activity: Activity;

    @Column()
    public organized: boolean;

    @Column()
    public approved: boolean;

    @Column()
    public ready: boolean;

    @Column({ name: 'max_users'})
    public maxUsers: number;

    @Column({ name: 'start_time'})
    public startTime: Date;

    @Column({ name: 'end_time'})
    public endTime: Date;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    public createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    public updatedAt: Date;

    @Column({ name: 'deleted_at', nullable: true })
    public deletedAt: Date;

    public toString(): string {
        return `Event #${this.id}, users #${this.users}`;
    }
}
