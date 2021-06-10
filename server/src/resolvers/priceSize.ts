import { Arg, Mutation, Resolver } from "type-graphql";
import { PriceSize } from "../entities/PriceSize";

@Resolver(PriceSize)
export class PriceSizeResolver {
    @Mutation(() => Boolean)
    async deletePriceSize(
        @Arg("id", () => String) id: string
    ): Promise<boolean> {
        await PriceSize.delete(id)
        return true
    }
}