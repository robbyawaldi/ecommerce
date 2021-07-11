import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { ColorInput } from "../resolvers/ColorInput";
import { Product } from "./Product";
import { Size } from "./Size";
import { Image } from "./Image"

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

    @OneToMany(() => Image, (image) => image.color, { nullable: true })
    images: Image[]

    @Field(() => [Size], { nullable: true })
    @ManyToMany(() => Size)
    @JoinTable()
    exceptSizes?: Size[];

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;

    static async saveColors(colors: ColorInput[], productId: string) {
        for (const [sequence, { id, code, name, exceptSizes }] of colors.entries()) {

            try {
                const insertResult = await this
                    .createQueryBuilder()
                    .insert()
                    .into(Color)
                    .values({
                        id,
                        code,
                        name,
                        sequence,
                        productId
                    })
                    .orUpdate({ conflict_target: ["id"], overwrite: ['code', 'name'] })
                    .execute()

                const color = await this.findOneOrFail(insertResult.identifiers[0].id)
                const sizes = await Size.findByIds(exceptSizes)

                color.exceptSizes = sizes
                this.getRepository().save(color)
            } catch (err) {
                console.log("insert color", err)
            }
        }
    }
}
