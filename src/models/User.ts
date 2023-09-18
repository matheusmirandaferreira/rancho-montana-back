import {
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  PrimaryGeneratedColumn,
  AfterInsert,
} from 'typeorm';
import bcrypt from 'bcryptjs';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  uuiduser: string;

  @Column()
  nmuser: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @CreateDateColumn({ type: 'timestamptz', generated: true })
  created_at: string;

  @UpdateDateColumn({ type: 'timestamptz', generated: true })
  updated_at: string;

  @BeforeInsert()
  async hashPassword() {
    const salt = await bcrypt.genSalt(8);
    this.password = await bcrypt.hash(this.password, salt);
  }

  toJSON() {
    return {
      ...this,
      password: undefined,
    };
  }
}
