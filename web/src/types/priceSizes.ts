
export type PriceSizeAction =
    | { type: "ADD" }
    | { type: "UPDATE", id: string, sizeId?: number | undefined, price?: number | undefined }
    | { type: "DELETE", id: string }
    | { type: "SET", priceSizes: ProductPriceSize[] }

export interface ProductPriceSize {
    id: string
    sizeId: number | undefined
    productId: string | undefined
    price: number | undefined
    __typename?: string
}

export interface PriceSizes {
    priceSizes: ProductPriceSize[]
}

export const priceSizeItem = {
    id: "",
    sizeId: undefined,
    productId: undefined,
    price: 0
}