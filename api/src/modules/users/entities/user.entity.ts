import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  Check,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';

export enum UserRole {
  user = 'user',
  admin = 'admin',
  editor = 'editor',
}

@Check(`google_sub IS NULL OR google_sub <> ''`)
@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 320 })
  email: string;

  @Column({ type: 'varchar', length: 100, name: 'first_name' })
  firstName: string;

  @Column({ type: 'varchar', length: 100, name: 'second_name', nullable: true })
  secondName: string | null;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 255, nullable: true, name: 'google_sub' })
  googleSub: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true, select: false })
  passwordHash: string | null;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.user })
  role: UserRole;

  @Column({ type: 'boolean', default: false })
  isEmailVerified: boolean;

  @Column({ type: 'varchar', length: 320, nullable: true, select: false })
  verificationToken: string | null;

  @Column({ type: 'datetime', nullable: true })
  verificationExpires: Date | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  normalizeGoogleSub() {
    if (this.googleSub === '') {
      this.googleSub = null;
    }
  }
}
