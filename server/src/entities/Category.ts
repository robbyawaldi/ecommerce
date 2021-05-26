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

  @Field(() => [Category], { nullable: true })
  @OneToMany(() => Category, (category) => category.parent, { nullable: true })
  @JoinColumn()
  child?: Category;

  @Field(() => Category, { nullable: true })
  @ManyToOne(() => Category, (category) => category.child, { nullable: true })
  @JoinColumn()
  parent?: Category;

  @Field()
  @Column({ default: 0 })
  level: number;

  @Column({ default: 1 })
  sequence: number;

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
