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
import { getConnection, getRepository } from "typeorm";
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

        let product = new Product();
        product.id = ulid();
        product.title = options.title;
        product.description = options.description;
        product.price = options.price
        product.stockAvailable = options.stockAvailable

        try {
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

            const categories = await Category
                .createQueryBuilder()
                .where("id IN (:...categories)", { categories: options.categories })
                .getMany()
            const sizes = await Size
                .createQueryBuilder()
                .where("id IN (:...sizes)", { sizes: options.sizes })
                .getMany()

            product.categories = categories;
            product.sizes = sizes;

            this.productRepository.save(product)
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

        return { product }
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

        try {
            const { images, categories, sizes, ...data } = options
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
            return {
                errors: [
                    {
                        field: '',
                        message: err
                    }
                ]
            }
        }

        let product = await Product.findOne(id, { relations: ['images'] })
        return {
            product: product
                ? { ...product, images: getImagesUrl(product, req) } as Product
                : undefined
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
