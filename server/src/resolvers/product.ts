import {
    Resolver,
    Query,
    Ctx,
    Mutation,
    Arg,
    UseMiddleware,
    Field,
    ObjectType,
} from "type-graphql";
import { getRepository } from "typeorm";
import { ulid } from "ulid";
import { Category } from "../entities/Category";
import { Image } from "../entities/Image";
import { Product } from "../entities/Product";
import { Size } from "../entities/Size";
import { isAuth } from "../middleware/isAuth";
import { MyContext } from "../types";
import { getImagesUrl } from "../utils/getImagesUrl";
import { validateProduct } from "../utils/validateProduct";
import { FieldError } from "./FieldError";
import { ProductInput } from "./ProductInput";

@ObjectType()
class ProductResponse {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];

    @Field(() => Product, { nullable: true })
    product?: Product;
}

@Resolver(Product)
export class ProductResolver {

    constructor(
        private productRepository = getRepository(Product)
    ) { }

    @Query(() => [Product], { nullable: true })
    async products(
        @Ctx() { req }: MyContext
    ): Promise<Product[]> {
        let products = await this.productRepository.find({ relations: ['images', 'categories', 'sizes'] })
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
        let product = await this.productRepository.findOne(id, { relations: ['images', 'categories', 'sizes'] })
        return product
            ? { ...product, images: getImagesUrl(product, req) } as Product
            : undefined
    }

    @Mutation(() => ProductResponse)
    @UseMiddleware(isAuth)
    async createProduct(
        @Arg('options') options: ProductInput
    ): Promise<ProductResponse> {
        
        const errors = validateProduct(options)
        if (errors) {
            return { errors }
        }
        
        const { images, categories, sizes, ...data } = options
        let product = { id: ulid(), ...data } as Product

        try {
            product.categories = await Category.findByIds(options.categories);
            product.sizes = await Size.findByIds(options.sizes);
            await Image.saveImages(images as Image[], product.id)
            await this.productRepository.save(product)
            return { product }
        } catch (err) {
            return {
                errors: [
                    {
                        field: '',
                        message: err
                    }
                ]
            }
        }
    }

    @Mutation(() => ProductResponse)
    @UseMiddleware(isAuth)
    async updateProduct(
        @Arg('id', () => String) id: string,
        @Arg('options') options: ProductInput,
        @Ctx() { req }: MyContext
    ): Promise<ProductResponse> {
        
        const errors = validateProduct(options)
        if (errors) {
            return { errors }
        }
        
        const { images, categories, sizes, ...data } = options

        try {
            let product = await this.productRepository.findOne(id, { relations: ['images'] })
            product = { ...product, ...data } as Product
            product.categories = await Category.findByIds(categories)
            product.sizes = await Size.findByIds(sizes)

            await Image.saveImages(images as Image[], product.id)
            await this.productRepository.save(product)
            return {
                product: product
                    ? { ...product, images: getImagesUrl(product, req) } as Product
                    : undefined
            }
        } catch (err) {
            return {
                errors: [
                    {
                        field: '',
                        message: err
                    }
                ]
            }
        }
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
