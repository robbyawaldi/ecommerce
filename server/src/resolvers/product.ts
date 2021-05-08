import {
    Resolver,
    Query,
    Ctx,
    Mutation,
    Arg,
    UseMiddleware,
    Field,
    ObjectType,
    Int,
    Args,
} from "type-graphql";
import { getRepository, SelectQueryBuilder } from "typeorm";
import { ulid } from "ulid";
import { Category } from "../entities/Category";
import { Image } from "../entities/Image";
import { Product } from "../entities/Product";
import { Size } from "../entities/Size";
import { isAuth } from "../middleware/isAuth";
import { MyContext } from "../types";
import { filterProduct } from "../utils/filterProduct";
import { generateSlug } from "../utils/generateSlug";
import { getImagesUrl } from "../utils/getImagesUrl";
import { searchProduct } from "../utils/searchProduct";
import { validateProduct } from "../utils/validateProduct";
import { FieldError } from "./FieldError";
import { FilterProduct } from "./FilterProduct";
import { PaginatedProducts } from "./PaginatedProducts";
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

    @Query(() => PaginatedProducts, { nullable: true })
    async products(
        @Ctx() { req }: MyContext,
        @Arg("page", () => Int) page: number,
        @Arg("limit", () => Int) limit: number,
        @Args() filter: FilterProduct
    ): Promise<PaginatedProducts> {
        const start = (page - 1) * limit;

        let products: Product[] | SelectQueryBuilder<Product> = this.productRepository
            .createQueryBuilder('product')
            .leftJoinAndSelect('product.images', 'images')
            .leftJoinAndSelect('product.categories', 'categories')
            .leftJoinAndSelect('product.sizes', 'sizes')

        products = products
            .skip(start)
            .take(limit);

        products = await filterProduct(products, filter)
        products = await searchProduct(products, filter)
        
        const total = await products.getCount();
        products = await products.getMany()
        products = products.map(product => {
            return { ...product, images: getImagesUrl(product, req) } as Product
        });

        let filterBy

        if (filter.categoryId && filter.categoryId !== 0) {
            const category = await Category.findOne(filter.categoryId);
            filterBy = { category: category?.name || '' };
        }

        return {
            products,
            meta: { page, limit, total, filter: filterBy }
        }
    }

    @Query(() => Product, { nullable: true })
    async product(
        @Ctx() { req }: MyContext,
        @Arg("id", () => String, { nullable: true }) id: string,
        @Arg("slug", () => String, { nullable: true }) slug?: string,
    ): Promise<Product | undefined> {
        let product;
        const relations = ['images', 'categories', 'sizes']
        if (slug)
            product = await this.productRepository.findOne({ where: { slug }, relations })
        else
            product = await this.productRepository.findOne(id, { relations })
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
        const slug = generateSlug(data.title);

        let product = { id: ulid(), ...data, slug } as Product

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
            let product = await this.productRepository.findOneOrFail(id, { relations: ['images'] })
            product = { ...product, ...data } as Product
            product.categories = await Category.findByIds(categories)
            product.sizes = await Size.findByIds(sizes)

            await Image.saveImages(images as Image[], product.id)

            if (product.slug == undefined) {
                product.slug = generateSlug(product.title)
            }

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
