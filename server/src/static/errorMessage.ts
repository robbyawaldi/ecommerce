enum User {
    NAME_ALREADY = "name already taken",
    NAME_MIN = "length must be greater than 2",
    NAME_CANNOT_INCLUDE_AN_AT = "cannot include an @",
    EMAIL_NOT_EXIST = "that email doesn't exist",
    EMAIL_INVALID = "invalid email",
    PASSWORD_INCORRECT = "incorrect password",
    PASSWORD_MIN = "length must be greater than 2"
}

enum Product {
    TITLE_INVALID = "invalid title",
    PRICE_MIN = "value must be greater than 0"
}

enum Size {
    NAME_MAX = "length must be less than 3",
    DESCRIPTION_MAX = "length must be less than 11",
    DESCRIPTION_INVALID = "invalid description"
}

export const ErrorMessage = {
    User,
    Product,
    Size
}
