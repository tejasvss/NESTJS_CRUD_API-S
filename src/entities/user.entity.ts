// import { Roles } from 'src/users/roles.enum';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne, JoinColumn } from 'typeorm';
import { Roles } from './roles.entity';


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    user_id: number;
    @Column()
    user_name: string;
    @Column()
    email: string;
    @Column()
    mobileNumber: string;
    @ManyToOne(() => Roles, (roles: Roles) => roles.role_id)
    @JoinColumn({ name: 'role_id' })
    role_id: Roles;
}