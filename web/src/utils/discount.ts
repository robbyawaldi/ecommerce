export const calculateDiscount = ({ price, discount }: { price: number, discount: number }): number => {
    return price - (price * (isNaN(discount) ? 0 : discount) / 100)
}