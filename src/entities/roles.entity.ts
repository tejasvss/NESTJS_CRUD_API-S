import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { Permissions } from './permissions.entity';

@Entity()
export class Roles {
    @PrimaryGeneratedColumn()
    role_id: number;
    @Column()
    role_name: string;
    @Column()
    role_description: string;
    @CreateDateColumn()
    created_at: Date;
    @CreateDateColumn()
    updated_at: Date;
    @ManyToOne(() => Permissions, (permissions: Permissions) => permissions.permission_id)
    @JoinColumn({ name: 'permission_id' })
    permission_id: Permissions;
}