import { Product } from "../entities/Product"
import { Request } from "express";

export function getImagesUrl(product: Product, req: Request) {
    return product.images?.map(image => {
        return { ...image, url: getImageUrl(image.image, req) }
    })
}

export function getImageUrl(filename: string, req: Request) {
    return `${req.protocol}://${req.get('host')}/images/${filename}`
}