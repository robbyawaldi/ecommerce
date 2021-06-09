import { Arg, Mutation, Resolver } from "type-graphql";
import { Color } from "../entities/Color";

@Resolver(Color)
export class ColorResolver {
    @Mutation(() => Boolean)
    async deleteColor(
        @Arg("id", () => String) id: string
    ): Promise<boolean> {
        await Color.delete(id)
        return true
    }
}