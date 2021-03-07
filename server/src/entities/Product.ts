import { ObjectType, Field } from "type-graphql";
import {
    Entity,
    CreateDateColumn,
    UpdateDateColumn,
    Column,
    BaseEntity,
    PrimaryColumn,
    ManyToMany,
    JoinTable,
    OneToMany,
} from "typeorm";
import { Category } from "./Category";
import { Image } from "./Image";
import { Size } from "./Size";

@ObjectType()
@Entity()
export class Product extends BaseEntity {
    @Field()
    @PrimaryColumn()
    id!: string;

    @Field()
    @Column()
    title!: string;

    @Field()
    @Column()
    description!: string;

    @Field()
    @Column()
    price: number;

    @Field()
    @Column()
    stockAvailable: boolean;

    @ManyToMany(() => Size)
    @JoinTable()
    sizes?: Size[];

    @ManyToMany(() => Category)
    @JoinTable()
    categories?: Category[]

    @Field(() => [Image])
    @OneToMany(() => Image, (image) => image.product)
    images?: Image[];

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;
}
