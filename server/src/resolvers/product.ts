import {
    Resolver,
    Query,
    Ctx,
    Mutation,
    Arg,
    UseMiddleware,
} from "type-graphql";
import { getConnection } from "typeorm";
import { ulid } from "ulid";
import { Image } from "../entities/Image";
import { Product } from "../entities/Product";
import { isAuth } from "../middleware/isAuth";
import { MyContext } from "../types";
import { getImagesUrl } from "../utils/getImagesUrl";
import { ProductInput } from "./ProductInput";

@Resolver(Product)
export class ProductResolver {

    @Query(() => [Product], { nullable: true })
    async products(
        @Ctx() { req }: MyContext
    ): Promise<Product[]> {
        let products = await Product.find({ relations: ['images'] })
        products = products.map(product => {
            return { ...product, images: getImagesUrl(product, req) } as Product
        })
        return products
    }

    @Query(() => Product, { nullable: true })
    async product(
        @Arg("id", () => String) id: string,
        @Ctx() { req }: MyContext
    ): Promise<Product | undefined> {
        let product = await Product.findOne(id, { relations: ['images'] })
        return product
            ? { ...product, images: getImagesUrl(product, req) } as Product
            : undefined
    }

    @Mutation(() => Product)
    @UseMiddleware(isAuth)
    async createProduct(
        @Arg('options') options: ProductInput
    ): Promise<Product | undefined> {
        let product: Product | undefined

        try {
            const result = await getConnection()
                .createQueryBuilder()
                .insert()
                .into(Product)
                .values({
                    id: ulid(),
                    title: options.title,
                    description: options.description,
                    price: options.price,
                    stockAvailable: options.stockAvailable
                })
                .returning('*')
                .execute()

            product = result.raw[0]

            for (const [sequence, { image }] of options.images.entries()) {
                await getConnection()
                    .createQueryBuilder()
                    .insert()
                    .into(Image)
                    .values({
                        id: ulid(),
                        image,
                        sequence,
                        productId: product?.id
                    })
                    .execute()
            }

        } catch (err) {
            console.error(err)
        }

        return product
    }

    @Mutation(() => Product)
    @UseMiddleware(isAuth)
    async updateProduct(
        @Arg('id', () => String) id: string,
        @Arg('options') options: ProductInput,
        @Ctx() { req }: MyContext
    ): Promise<Product | undefined> {
        try {
            const { images, ...data} = options
            await getConnection()
                .createQueryBuilder()
                .update(Product)
                .set(data)
                .where('id = :id', { id })
                .execute()

            for (const [sequence, { image }] of images.entries()) {
                await getConnection()
                    .createQueryBuilder()
                    .insert()
                    .into(Image)
                    .values({
                        id: ulid(),
                        image,
                        sequence,
                        productId: id
                    })
                    .execute()
            }
        } catch (err) {
            console.error(err)
        }

        let product = await Product.findOne(id, { relations: ['images'] })
        return product
            ? { ...product, images: getImagesUrl(product, req) } as Product
            : undefined
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async deleteProduct(
        @Arg("id", () => String) id: string
    ): Promise<boolean> {
        await Product.delete(id)
        return true
    }
}
