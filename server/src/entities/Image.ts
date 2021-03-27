import { ObjectType, Field } from "type-graphql";
import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  BaseEntity,
  PrimaryColumn,
  ManyToOne,
} from "typeorm";
import { ulid } from "ulid";
import { Product } from "./Product";

@ObjectType()
@Entity()
export class Image extends BaseEntity {
  @Field()
  @PrimaryColumn()
  id!: string;

  @Field()
  @Column()
  image!: string;

  @Field()
  url: string;

  @Field()
  @Column()
  sequence!: number;

  @Column()
  productId!: string;

  @ManyToOne(() => Product, (product) => product.images, { onDelete: "CASCADE" })
  product: Product;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

  static async saveImages(images: Image[], productId: string) {
    for (const [sequence, { image }] of images.entries()) {
      await this
        .createQueryBuilder()
        .insert()
        .into(Image)
        .values({
          id: ulid(),
          image,
          sequence,
          productId
        })
        .execute()
    }
  }
}
