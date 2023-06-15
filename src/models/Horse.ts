import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Race } from './Race';
import { Color } from './Color';
import { Pace } from './Pace';

@Entity()
export class Horse {
  @PrimaryGeneratedColumn('uuid')
  uuidhorse: string;

  @Column()
  nmhorse: string;

  @Column()
  description: string;

  @Column({ type: 'date' })
  birthdate: string;

  @Column()
  uuidrace: string;

  @ManyToOne(() => Race)
  @JoinColumn({ name: 'uuidrace' })
  race: Race;

  @Column()
  uuidcolor: string;

  @ManyToOne(() => Color)
  @JoinColumn({ name: 'uuidcolor' })
  color: Color;

  @Column()
  uuidpace: string;

  @ManyToOne(() => Pace)
  @JoinColumn({ name: 'uuidpace' })
  pace: Pace;

  @CreateDateColumn({ type: 'timestamptz', generated: true })
  created_at: string;

  @UpdateDateColumn({ type: 'timestamptz', generated: true })
  updated_at: string;

  toJSON() {
    return {
      ...this,
      uuidcolor: undefined,
      uuidpace: undefined,
      uuidrace: undefined,
    };
  }
}
