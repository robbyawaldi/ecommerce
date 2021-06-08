import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { ulid } from "ulid";
import { Product } from "./Product";

@ObjectType()
@Entity()
export class Color extends BaseEntity {
    @Field()
    @PrimaryColumn()
    id!: string;

    @Field()
    @Column()
    code!: string;

    @Field()
    @Column()
    name!: string;

    @Field()
    @Column()
    sequence!: number;

    @Column()
    productId!: string;

    @ManyToOne(() => Product, (product) => product.colors, { onDelete: "CASCADE", onUpdate: "CASCADE" })
    product: Product;

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;

    static async saveColors(colors: Color[], productId: string) {
        for (const [sequence, { code, name }] of colors.entries()) {
            try {
                await this
                    .createQueryBuilder()
                    .insert()
                    .into(Color)
                    .values({
                        id: ulid(),
                        code,
                        name,
                        sequence,
                        productId
                    })
                    .execute()
            } catch (err) {
                console.log("insert color", err)
            }
        }
    }
}
