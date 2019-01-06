import { IsNotEmpty } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { User } from './User';

@Entity()
export class Localization {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({
        name: 'user_id',
        nullable: true,
    })
    public userId: number;

    @Column({
        name: 'event_id',
        nullable: true,
    })
    public eventId: number;

    @Column()
    public lat: string;

    @Column()
    public long: string;

    @Column({name: "created_at", type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    public createdAt: number;

    @Column({name: "updated_at", nullable: true })
    public updatedAt: number;

    @Column({name: "deleted_at", nullable: true })
    public deletedt: number;

    @ManyToOne(type => User, user => user.id)
    @JoinColumn({ name: 'user_id' })
    public user: User;

    public toString(): string {
        return `Localization #${this.id}, user #${this.userId}`;
    }

}
