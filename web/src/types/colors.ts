export type ColorAction =
    | { type: "ADD" }
    | { type: "UPDATE", id: string, code?: string | undefined, name?: string | undefined }
    | { type: "DELETE", id: string }
    | { type: "SET", colors: ProductColor[] }

export interface ProductColor {
    id: string;
    code: string | undefined
    name: string | undefined
    __typename?: string
}

export interface Colors {
    colors: ProductColor[]
}