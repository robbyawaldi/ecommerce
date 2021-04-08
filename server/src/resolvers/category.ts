import { Arg, Field, Int, Mutation, ObjectType, Query, Resolver, UseMiddleware } from "type-graphql";
import { getRepository } from "typeorm";
import { Category } from "../entities/Category";
import { isAdmin } from "../middleware/isAdmin";
import { isAuth } from "../middleware/isAuth";
import { CategoryInput } from "./CategoryInput";
import { Response } from "./Response";

@ObjectType()
class CategoryResponse extends Response {
    @Field(() => Category, { nullable: true })
    category?: Category;
}

@Resolver(Category)
export class CategoryResolver {

    constructor(
        private categoryRepository = getRepository(Category)
    ) { }

    @Query(() => [Category], { nullable: true })
    async categories(): Promise<Category[]> {
        return this.categoryRepository.find()
    }

    @Mutation(() => CategoryResponse)
    async createCategory(
        @Arg('options', () => CategoryInput) options: CategoryInput
    ): Promise<CategoryResponse> {
        let category = { ...options } as Category;
        try {
            await this.categoryRepository.save(category)
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

        return {
            category
        }
    }

    @Mutation(() => CategoryResponse)
    async updateCategory(
        @Arg('id', () => Int) id: number,
        @Arg('options', () => CategoryInput) options: CategoryInput
    ): Promise<CategoryResponse> {
        try {
            let category = await this.categoryRepository.findOneOrFail(id)
            category = { ...category, ...options } as Category
            await this.categoryRepository.save(category)
            return {
                category
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

    @Mutation(() => CategoryResponse)
    async addCategoryChild(
        @Arg('parentId', () => Int) parentId: number,
        @Arg('options', () => CategoryInput) options: CategoryInput
    ): Promise<CategoryResponse> {
        let child = { ...options } as Category
        try {
            let parent = await this.categoryRepository.findOneOrFail(parentId)
            child.parent = parent
            child.level = parent.level + 1
            await this.categoryRepository.save(child)
            return {
                category: child
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
    @UseMiddleware(isAdmin)
    async deleteCategory(
        @Arg("id", () => Int) id: number,
    ): Promise<boolean> {
        await this.categoryRepository.delete(id)
        return true
    }
}