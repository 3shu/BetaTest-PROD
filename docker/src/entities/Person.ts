import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  OneToMany,
  JoinTable
} from "typeorm";
import { Assets } from './Assets'
import { IsNotEmpty } from "class-validator";

@Entity()
@Unique(["email"])
export class Person extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  email: string;

  @Column()
  @IsNotEmpty()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Assets, (asset: Assets) => asset.person)
  @JoinTable()
  public assets: Assets[];
}
