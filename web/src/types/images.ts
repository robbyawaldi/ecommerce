export type Action = 
    | {type: "ADD"}
    | {type: "UPDATE", id: string, image: string, url: string}
    | {type: "DELETE", id: string}

export interface ProductImage {
    id: string
    image: string | undefined
    url: string | undefined
}

export interface State {
    images: ProductImage[]
}