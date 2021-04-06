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
    @Query(() => [Category], { nullable: true })
    async categories(): Promise<Category[]> {
        return Category.find()
    }

    @Mutation(() => CategoryResponse)
    async createCategory(
        @Arg('options', () => CategoryInput) options: CategoryInput
    ): Promise<CategoryResponse> {
        let category = { ...options } as Category;
        try {
            const categoryRepository = getRepository(Category)
            await categoryRepository.save(category)
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

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    @UseMiddleware(isAdmin)
    async deleteCategory(
        @Arg("id", () => Int) id: number,
    ): Promise<boolean> {
        await Category.delete(id)
        return true
    }
}