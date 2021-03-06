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
import { Color } from "./Color";
import { Image } from "./Image";
import { PriceSize } from "./PriceSize";
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
    @Column({ nullable: true })
    slug: string;

    @Field()
    @Column()
    description!: string;

    @Field()
    @Column({ default: "" })
    detail!: string;

    @Field()
    @Column()
    price: number;

    @Field()
    @Column({ default: 0 })
    discount: number;

    @Field()
    @Column()
    stockAvailable: boolean;

    @Field()
    @Column({ default: false })
    isPublish: boolean;

    @Field()
    @Column({ default: false })
    isExclusive: boolean;

    @Field()
    @Column({ default: false })
    isDiscount: boolean;

    @Field()
    @Column({ default: false })
    isMalikha: boolean;

    @Field(() => [Size])
    @ManyToMany(() => Size)
    @JoinTable()
    sizes?: Size[];

    @Field(() => [Category])
    @ManyToMany(() => Category)
    @JoinTable()
    categories?: Category[]

    @Field(() => [Image])
    @OneToMany(() => Image, (image) => image.product)
    images?: Image[];

    @Field(() => [Color])
    @OneToMany(() => Color, (color) => color.product)
    colors?: Color[];

    @Field(() => [PriceSize])
    @OneToMany(() => PriceSize, (priceSize) => priceSize.product)
    priceSizes?: PriceSize[];

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;
}
