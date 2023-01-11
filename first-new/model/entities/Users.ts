import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('users_pkey', ['userId'], { unique: true })
@Entity('users', { schema: 'public' })
export class Users {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'user_id' })
  userId: number;

  @Column('character varying', {
    name: 'first_name',
    nullable: true,
    length: 40,
  })
  firstName: string | null;

  @Column('character varying', {
    name: 'last_name',
    nullable: true,
    length: 40,
  })
  lastName: string | null;

  @Column('character varying', { name: 'username', nullable: true, length: 40 })
  username: string | null;

  @Column('character varying', { name: 'password', nullable: true })
  password: string | null;
}
