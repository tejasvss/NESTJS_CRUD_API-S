import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Permissions {
    @PrimaryGeneratedColumn()
    permission_id: number;
    @Column()
    permission_name: string;
    @Column()
    permission_description: string;
    @CreateDateColumn()
    date_created: Date;
    @CreateDateColumn()
    date_updated: Date;

}