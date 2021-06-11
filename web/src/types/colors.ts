
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

export const colorItem = {
    id: "",
    code: '#12A7D6',
    name: undefined
}