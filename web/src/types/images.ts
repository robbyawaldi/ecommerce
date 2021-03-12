export type Action =
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

export interface State {
    images: ProductImage[]
}