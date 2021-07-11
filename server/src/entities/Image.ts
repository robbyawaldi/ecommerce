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
import { ImageInput } from "../resolvers/ImageInput";
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

  @Field({ nullable: true })
  @Column({ nullable: true, default: null })
  color?: string;

  @ManyToOne(() => Product, (product) => product.images, { onDelete: "CASCADE" })
  product: Product;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

  static async saveImages(images: ImageInput[], productId: string) {
    for (const [sequence, { id, image, color }] of images.entries()) {
      console.log("upload gambar", image, color)
      try {
        await this
          .createQueryBuilder()
          .insert()
          .into(Image)
          .values({
            id,
            image,
            sequence,
            productId,
            color,
          })
          .orUpdate({ conflict_target: ['id'], overwrite: ['color'] })
          .execute()
      } catch (err) {
        console.log("insert image", err)
      }
    }
  }
}
