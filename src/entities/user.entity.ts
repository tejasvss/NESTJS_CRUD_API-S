// import { Roles } from 'src/users/roles.enum';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Roles } from './roles.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    user_id: number;
    @Column()
    user_name: string;
    @Column({ unique: true })
    email: string;
    @Column({ unique: true, type: 'bigint' })
    mobileNumber: number;
    @CreateDateColumn()
    created_at: Date;
    @CreateDateColumn()
    updated_at: Date;
    @ManyToOne(() => Roles, (roles: Roles) => roles.role_id)
    @JoinColumn({ name: 'role_id' })
    role_id: Roles;
}