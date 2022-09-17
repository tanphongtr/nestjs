import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinColumn, JoinTable } from 'typeorm';
import { Image } from 'src/images/entities/image.entity';

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: true })
  isActive: boolean;
  
  @OneToMany(() => Image, (image) => image.user)
  images: Image[];

  @ManyToMany(() => Image, (image) => image.userM2M)
  @JoinTable({ name: 'user_image' })
  imagesM2M: Image[];
}
