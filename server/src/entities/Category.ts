import { ObjectType, Field } from "type-graphql";
import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from "typeorm";

@ObjectType()
@Entity()
export class Category extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToMany(() => Category, (category) => category.parent, { nullable: true })
  @JoinColumn()
  child?: Category;

  @ManyToOne(() => Category, (category) => category.child, { nullable: true })
  @JoinColumn()
  parent?: Category;

  @Column({ default: 0 })
  level: number;

  @Field()
  @Column()
  name!: string;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
