import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  BaseEntity,
  JoinColumn
} from "typeorm";
import { IsNotEmpty } from "class-validator";
import { Person } from "./Person";

@Entity()
@Unique(["title"])
export class Assets extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  title: string;

  @Column()
  description: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
  
  @ManyToOne(() => Person, (person: Person) => person.assets, { nullable: false })
  @JoinColumn()
  public person: Person;
}
