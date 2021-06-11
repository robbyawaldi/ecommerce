import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { ulid } from "ulid";
import { Product } from "./Product";
import { Size } from "./Size";

@ObjectType()
@Entity()
export class PriceSize extends BaseEntity {
    @Field()
    @PrimaryColumn()
    id!: string;

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

    static async savePriceSizes(priceSizes: PriceSize[], productId: string) {
        for (const { sizeId, price } of priceSizes) {
            try {
                await this
                    .createQueryBuilder()
                    .insert()
                    .into(PriceSize)
                    .values({
                        id: ulid(),
                        productId,
                        sizeId,
                        price
                    })
                    .execute()
            } catch (err) {
                console.log("insert price size", err)
            }
        }
    }

}