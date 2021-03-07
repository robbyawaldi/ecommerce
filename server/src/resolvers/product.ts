import {
    Resolver,
    Query,
    Ctx,
} from "type-graphql";
import { Product } from "../entities/Product";
import { MyContext } from "../types";


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
                images: product.images.map(image => {
                    return {...image, image: `${req.protocol}://${req.get('host')}/images/${image.image}`}
                })
            } as Product
        })
        return products
    }
}
