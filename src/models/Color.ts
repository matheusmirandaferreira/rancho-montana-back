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
export class Color {
  @PrimaryGeneratedColumn('uuid')
  uuidcolor: string;

  @Column({ unique: true })
  nmcolor: string;

  @OneToMany(() => Horse, (horse) => horse.color, {
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
