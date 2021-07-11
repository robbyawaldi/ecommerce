export type ProductDetailAction =
    | { type: "UPDATE", size?: string, color?: string }

export interface ProductDetail {
    size: string
    color: string
}