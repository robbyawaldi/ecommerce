import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Product } from "./Product";
import { Size } from "./Size";

@ObjectType()
@Entity()
export class PriceSize extends BaseEntity {
    @Field()
    @Column({ primary: true })
    id!: string;

    @Field()
    @Column()
    productId: string;

    @ManyToOne(() => Product)
    @JoinColumn({ name: "productId" })
    product: Product;

    @Field()
    @Column()
    sizeId: number;

    @Field({ nullable: true })
    sizeName: string;

    @ManyToOne(() => Size)
    @JoinColumn({ name: "sizeId" })
    size: Size;

    @Field()
    @Column()
    price: number;

    static async savePriceSizes(priceSizes: PriceSize[], productId: string) {
        for (const { id, sizeId, price } of priceSizes) {
            try {
                await this
                    .createQueryBuilder()
                    .insert()
                    .into(PriceSize)
                    .values({
                        id,
                        productId,
                        sizeId,
                        price
                    })
                    .orUpdate({ conflict_target: ["id"], overwrite: ['sizeId', 'price'] })
                    .execute()
            } catch (err) {
                console.log("insert price size", err)
            }
        }
    }

}