import { type } from 'os';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, JoinColumn, ManyToMany, ManyToOne, JoinTable } from 'typeorm';
import { Permissions } from './permissions.entity';

@Entity()
export class Roles {
    @PrimaryGeneratedColumn()
    role_id: number;
    @Column({ unique: true, nullable: true })
    role_name: string;
    @Column({ nullable: true })
    role_description: string;
    @CreateDateColumn()
    created_at: Date;
    @CreateDateColumn()
    updated_at: Date;
    @ManyToMany(() => Permissions, (permissions: Permissions) => permissions.permission_id, { eager: true })
    @JoinTable({
        name: 'role_permissions',
        joinColumn: {
            name: 'role_id',
            referencedColumnName: 'role_id'
        },
        inverseJoinColumn: {
            name: 'permission_id',
            referencedColumnName: 'permission_id'
        }
    })
    permissions: Permissions[];
}