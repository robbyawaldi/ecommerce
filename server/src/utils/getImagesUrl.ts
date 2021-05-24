import { __prod__ } from "../constants"
import { Product } from "../entities/Product"

export function getImagesUrl(product: Product) {
    return product.images?.sort((prev, next) => {
        return prev.sequence - next.sequence
    }).map(image => {
        return { ...image, url: getImageUrl(image.image) }
    })
}

export function getImageUrl(filename: string) {
    return `${__prod__ ? process.env.APP_URL : 'http://localhost:4000'}/images/${filename}`
}