import { SizeInput } from "../resolvers/SizeInput";
import { ErrorMessage } from "../static/errorMessage";

export const validateSize = (options: SizeInput) => {
    if (options.name.length > 10) {
        return [
            {
                field: 'name',
                message: ErrorMessage.Size.NAME_MAX
            }
        ]
    }

    if (options.description.length >= 20) {
        return [
            {
                field: 'description',
                message: ErrorMessage.Size.DESCRIPTION_MAX
            }
        ]
    }

    if (!options.description.match(/\D/g)) {
        return [
            {
                field: 'description',
                message: ErrorMessage.Size.DESCRIPTION_INVALID
            }
        ]
    }

    return null
}