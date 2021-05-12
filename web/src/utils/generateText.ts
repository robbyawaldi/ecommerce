export type Item = {
    title: string
    size: string
    price: string
    qty: number
}

const HEADER = `Selamat Siang, Saya ingin memesan dengan rincian sebagai berikut ;;-----------------------;;`
const FOOTER = `;-----------------------;Terima Kasih`

export const generateText = (items: Item[], subTotal: string): string => {
    let text = HEADER;
    for (const { title, size, price, qty} of items) {
        text = text + `${title} ukuran ${size} @${price} x ${qty};;`
    }
    text = text + `;-----------------------;Total ${subTotal}`
    return (text + FOOTER).replace(/[;]/g, '%0a')
}