import { PriceSize } from "../entities/PriceSize";
import { Size } from "../entities/Size";

export async function getSizeName(priceSizes: PriceSize[]): Promise<PriceSize[]> {
    return Promise.all(priceSizes.map(async (priceSize) => {
        const size = await Size.findOne(priceSize.sizeId, { select: ['name'] })
        return {
            ...priceSize,
            sizeName: size?.name
        } as PriceSize
    }))
}