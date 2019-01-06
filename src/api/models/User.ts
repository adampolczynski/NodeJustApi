import { IsNotEmpty } from 'class-validator';
import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    Unique,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryColumn
} from 'typeorm';

import { Localization } from './Localization';
import { Activity } from './Activity';
import { Interest } from './Interest';

@Entity()
export class User {
    @PrimaryColumn()
    public id: number;

    @IsNotEmpty()
    @Column({ name: 'fb_id' })
    public fbId: string;

    @IsNotEmpty()
    @Column({ name: 'name' })
    public name: string;

    @IsNotEmpty()
    @Column({ name: 'surname' })
    public surname: string;

    @Column({ name: 'password' })
    public password: string;

    @IsNotEmpty()
    @Column({ unique: true })
    public email: string;

    // @Column()
    // public gender: number;

    // @Column()
    // public photo: string;

    @Column({ name: 'fb_photo' })
    public fbPhoto: string;

    @Column({ default: false })
    public activated: boolean;

    // @Column({ default: false })
    // public premium: boolean;

    // @OneToMany(type => Interest, interest => interest.user)
    // public interests: Interest[];

    // @OneToMany(type => Localization, localization => localization.user)
    // public localizations: Localization[];

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    public createdAt: Date;

    // @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    // public updatedAt: Date;

    // @Column({ name: 'deleted_at', nullable: true })
    // public deletedAt: Date;

    public toString(): string {
        return `${this.name} ${this.surname} (${this.email})`;
    }
}
