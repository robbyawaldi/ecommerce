export type Item = {
    title: string
    size: string
    price: string
    qty: number,
    color: string,
}

export const getGreeting = (): string => {
    const today = new Date()
    const hours = today.getHours()

    if (hours < 12)
        return 'Pagi'
    else if (hours < 16)
        return 'Siang'
    else if (hours < 18)
        return 'Sore'
    else
        return 'Malam'
}

export const generateText = (items: Item[], subTotal: string): string => {
    const HEADER = `Selamat ${getGreeting()}, Saya ingin memesan dengan rincian sebagai berikut ;;-------------------------------------------------------------;;`
    const FOOTER = `;-------------------------------------------------------------;Terima Kasih`

    let text = HEADER;
    for (const { title, size, price, qty, color } of items) {
        text = text + `${title} ${color} ukuran ${size} @${price} x ${qty};;`
    }
    text = text + `-------------------------------------------------------------;Total ${subTotal}`
    return (text + FOOTER).replace(/[;]/g, '%0a')
}