import { Images, ImageAction, ProductImage } from "../../types/images"
import { randomId } from "../../utils/randomId"

export function imageReducer(state: Images, action: ImageAction) {
    switch (action.type) {
        case "ADD":
            return {
                images: [...state.images, { id: randomId(), image: undefined, url: undefined }]
            }
        case "UPDATE":
            return {
                images: state.images.map((image: ProductImage) =>
                    image.id === action.id
                        ? { ...image, image: action.image, url: action.url }
                        : image)
            }
        case "DELETE":
            return {
                images: state.images.filter((image: ProductImage) => image.id !== action.id)
            }
        case "SET":
            return {
                images: [...action.images, { id: randomId(), image: undefined, url: undefined }]
            }
        default:
            return state
    }
}