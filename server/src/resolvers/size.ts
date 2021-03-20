import { Arg, Field, Int, Mutation, ObjectType, Query, Resolver, UseMiddleware } from "type-graphql";
import { getRepository } from "typeorm";
import { Size } from "../entities/Size";
import { isAuth } from "../middleware/isAuth";
import { validateSize } from "../utils/validateSize";
import { FieldError } from "./FieldError";
import { SizeInput } from "./SizeInput";

@ObjectType()
class SizeResponse {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];

    @Field(() => Size, { nullable: true })
    size?: Size;
}

@Resolver(Size)
export class SizeResolver {
    @Query(() => [Size], { nullable: true })
    async sizes(): Promise<Size[] | undefined> {
        return Size.find()
    }

    @Mutation(() => SizeResponse)
    @UseMiddleware(isAuth)
    async createSize(
        @Arg('options', () => SizeInput) options: SizeInput
    ): Promise<SizeResponse> {
        const errors = validateSize(options)
        if (errors) {
            return {
                errors
            }
        }

        let size = { ...options } as Size
        try {
            const sizeRepository = getRepository(Size)
            await sizeRepository.save(size)
        } catch (err) {
            console.error(err)
            return {
                errors: [
                    {
                        field: '',
                        message: 'something wrong'
                    }
                ]
            }
        }

        return {
            size
        }
    }

    @Mutation(() => SizeResponse)
    @UseMiddleware(isAuth)
    async updateSize(
        @Arg('id', () => Int) id: number,
        @Arg('options', () => SizeInput) options: SizeInput
    ): Promise<SizeResponse> {
        const errors = validateSize(options)
        if (errors) {
            return {
                errors
            }
        }

        const sizeRepository = getRepository(Size)
        let size = await sizeRepository.findOne({ id })
        try {
            if (size) {
                size = { ...size, ...options } as Size
                sizeRepository.save(size)
            }
        } catch (err) {
            console.error(err)
            return {
                errors: [
                    {
                        field: '',
                        message: 'something wrong'
                    }
                ]
            }
        }

        return {
            size
        }
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async deleteSize(
        @Arg("id", () => Int) id: number
    ): Promise<boolean> {
        await Size.delete(id)
        return true
    }
}