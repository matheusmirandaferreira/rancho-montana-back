import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Horse } from './Horse';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  uuidcategory: string;

  @Column({ unique: true })
  nmcategory: string;

  @Column({ unique: true })
  category_permalink: string;

  @OneToMany(() => Horse, (horse) => horse.category, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'uuidhorse' })
  horses: Horse[];

  @CreateDateColumn({ type: 'timestamptz', generated: true })
  created_at: string;

  @UpdateDateColumn({ type: 'timestamptz', generated: true })
  updated_at: string;
}
