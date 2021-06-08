import { GraphQLResolveInfo } from "graphql";
import {
    Resolver,
    Query,
    Mutation,
    Arg,
    UseMiddleware,
    Field,
    ObjectType,
    Int,
    Args,
    Info
} from "type-graphql";
import graphqlFields from 'graphql-fields'
import { getRepository, SelectQueryBuilder } from "typeorm";
import { ulid } from "ulid";
import { Category } from "../entities/Category";
import { Image } from "../entities/Image";
import { Product } from "../entities/Product";
import { Size } from "../entities/Size";
import { isAuth } from "../middleware/isAuth";
import { filterProduct } from "../utils/filterProduct";
import { generateSlug } from "../utils/generateSlug";
import { getImagesUrl } from "../utils/getImagesUrl";
import { searchProduct } from "../utils/searchProduct";
import { validateProduct } from "../utils/validateProduct";
import { FieldError } from "./FieldError";
import { FilterProduct } from "./FilterProduct";
import { PaginatedProducts } from "./PaginatedProducts";
import { ProductInput } from "./ProductInput";
import { joinProduct } from "../utils/joinsProduct";
import { Color } from "../entities/Color";

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
        @Arg("page", () => Int) page: number,
        @Arg("limit", () => Int) limit: number,
        @Args() filter: FilterProduct,
        @Info() info: GraphQLResolveInfo,
    ): Promise<PaginatedProducts> {

        const fields = Object.keys(graphqlFields(info).products)

        let products: Product[] | SelectQueryBuilder<Product> = this.productRepository.createQueryBuilder('product')
            .select(fields
                .filter(field => !['images', 'colors', 'categories', 'sizes', '__typename'].includes(field))
                .map(field => `product.${field}`)
                .concat(['product.id', 'product.createdAt'])
            )

        products = joinProduct(products, info, fields, 'images')
        products = joinProduct(products, info, fields, 'colors')
        products = joinProduct(products, info, fields, 'categories')
        products = joinProduct(products, info, fields, 'sizes')

        products = await filterProduct(products, filter)
        products = await searchProduct(products, filter)

        const total = await products.getCount();
        const start = (page - 1) * limit;
        products = products.skip(start).take(limit);
        products = await products.getMany()

        products = products.map(product => ({ ...product, images: getImagesUrl(product.images as Image[]) } as Product));

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
        @Arg("id", () => String, { nullable: true }) id: string,
        @Arg("slug", () => String, { nullable: true }) slug?: string,
    ): Promise<Product | undefined> {
        let product;
        const relations = ['images', 'colors' , 'categories', 'sizes']
        if (slug)
            product = await this.productRepository.findOne({ where: { slug }, relations })
        else
            product = await this.productRepository.findOne(id, { relations })
        return product
            ? { ...product, images: getImagesUrl(product.images as Image[]) } as Product
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

        const { categories, sizes, images, colors, ...data } = options
        const slug = generateSlug(data.title);
        const product = { id: ulid(), ...data, slug } as Product

        try {
            product.categories = await Category.findByIds(options.categories);
            product.sizes = await Size.findByIds(options.sizes);
            await this.productRepository.save(product)
            await Image.saveImages(images as Image[], product.id)
            await Color.saveColors(colors as Color[], product.id)

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
    ): Promise<ProductResponse> {

        const errors = validateProduct(options)
        if (errors) {
            return { errors }
        }

        let { images, categories, sizes, ...data } = options

        try {
            let product = await this.productRepository.findOneOrFail(id)
            product = { ...product, ...data } as Product
            product.categories = await Category.findByIds(categories)
            product.sizes = await Size.findByIds(sizes)

            await Image.saveImages(images as Image[], product.id)

            if (product.slug == undefined) {
                product.slug = generateSlug(product.title)
            }

            await this.productRepository.save(product)

            images = await Image.find({ where: { productId: product.id } })

            return {
                product: product
                    ? { ...product, images: getImagesUrl(images as Image[]) } as Product
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
    async updateProductPublish(
        @Arg('id', () => String) id: string,
        @Arg('isPublish', () => Boolean) isPublish: boolean
    ): Promise<boolean> {
        try {
            const product = await this.productRepository.findOneOrFail(id)
            product.isPublish = isPublish
            await this.productRepository.save(product)
            return true
        } catch (err) {
            return false
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
