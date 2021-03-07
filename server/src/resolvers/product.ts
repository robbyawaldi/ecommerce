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
import { Product } from "../entities/Product";
import { isAuth } from "../middleware/isAuth";
import { MyContext } from "../types";
import { ProductInput } from "./ProductInput";


@Resolver(Product)
export class ProductResolver {

    @Query(() => [Product], { nullable: true })
    async products(
        @Ctx() {req} : MyContext
    ): Promise<Product[]> {
        let products = await Product.find({ relations: ['images'] })
        products = products.map(product => {
            return {
                ...product,
                images: product.images?.map(image => {
                    return {...image, image: `${req.protocol}://${req.get('host')}/images/${image.image}`}
                })
            } as Product
        })
        return products
    }

    @Mutation(() => Product)
    @UseMiddleware(isAuth)
    async product(
        @Arg('options') options: ProductInput
    ): Promise<Product | undefined> {
        let product

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
        } catch(err) {
            console.error(err)
        }

        return product
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
