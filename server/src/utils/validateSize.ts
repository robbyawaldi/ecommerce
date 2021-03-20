import { SizeInput } from "../resolvers/SizeInput";

export const validateSize = (options: SizeInput) => {
    if (options.name.length > 2) {
        return [
            {
                field: 'name',
                message: 'length must be less than 3'
            }
        ]
    }

    if (options.description.length >= 10) {
        return [
            {
                field: 'description',
                message: 'length must be less than 11'
            }
        ]
    }

    if (!options.description.match(/\D/g)) {
        return [
            {
                field: 'description',
                message: 'invalid description'
            }
        ]
    }

    return null
}