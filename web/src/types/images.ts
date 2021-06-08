export type ImageAction =
    | { type: "ADD" }
    | { type: "UPDATE", id: string, image: string, url: string }
    | { type: "DELETE", id: string }
    | { type: "SET", images: ProductImage[] }

export interface ProductImage {
    id: string
    image: string | undefined
    url: string | undefined
    __typename?: string
}

export interface Images {
    images: ProductImage[]
}