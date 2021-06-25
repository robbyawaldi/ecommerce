import { __prod__ } from "../constants"
import { Image } from "../entities/Image"

export function getImagesUrl(images: Image[]) {
    return images?.sort((prev, next) => {
        return prev.sequence - next.sequence
    }).map(image => {
        return { ...image, url: getImageUrl(image.image) }
    })
}

export function getImageUrl(filename: string) {
    return `${process.env.CDN_URL}/products/${filename}`
}