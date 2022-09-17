import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
  JoinColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  lastModified: Date;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.images, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @ManyToMany(() => User, (user) => user.imagesM2M)
  userM2M: User[];

  @Column()
  new: boolean;

  @Column()
  deleted: boolean;
}
