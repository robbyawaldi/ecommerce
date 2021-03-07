import { Product } from "../entities/Product"
import { Request } from "express";

export function getUrlImages(product: Product, req: Request) {
    return product.images?.map(image => {
        return { ...image, image: `${req.protocol}://${req.get('host')}/images/${image.image}` }
    })
}