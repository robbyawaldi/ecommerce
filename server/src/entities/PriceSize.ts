import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Product } from "./Product";
import { Size } from "./Size";

@ObjectType()
@Entity()
export class PriceSize extends BaseEntity {
    @Field()
    @PrimaryColumn()
    productId: string;

    @ManyToOne(() => Product)
    @JoinColumn({ name: "productId" })
    product: Product;

    @Field()
    @PrimaryColumn()
    sizeId: number;

    @ManyToOne(() => Size)
    @JoinColumn({ name: "sizeId" })
    size: Size;

    @Field()
    @Column()
    price: number;

}