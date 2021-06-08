import { ColorAction, Colors, ProductColor } from "../../types/colors";
import { randomId } from "../../utils/randomId";

export function colorReducer(state: Colors, action: ColorAction) {
    switch (action.type) {
        case "ADD":
            return {
                colors: [...state.colors, { id: randomId(), code: undefined, name: undefined }]
            }
        case "UPDATE":
            return {
                colors: state.colors.map((color: ProductColor) =>
                    color.id === action.id
                        ? { ...color, code: action.code, name: action.name }
                        : color)
            }
        case "DELETE":
            return {
                colors: state.colors.filter((color: ProductColor) => color.id !== action.id)
            }
        case "SET":
            return {
                colors: [...action.colors, { id: randomId(), color: undefined, url: undefined }]
            }
        default:
            return state
    }
}