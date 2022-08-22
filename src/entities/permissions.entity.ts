import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToMany, JoinColumn } from 'typeorm';
import { Roles } from './roles.entity';

@Entity()
export class Permissions {
    @PrimaryGeneratedColumn()
    permission_id: number;
    @Column({ unique: true, nullable: true })
    permission_name: string;
    @Column({ nullable: true })
    permission_description: string;
    @CreateDateColumn({ type: 'timestamptz' })
    date_created: Date;
    @CreateDateColumn({ type: 'timestamptz' })
    date_updated: Date;

}