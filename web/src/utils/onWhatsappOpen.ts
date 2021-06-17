import { PHONE } from "../static/contacts"
import { getGreeting } from "./generateText"

export const onWhatsappOpen: React.MouseEventHandler = (e) => {
    e.preventDefault()
    const text = `Selamat ${getGreeting()}`
    window.open(`https://api.whatsapp.com/send?phone=${PHONE}&text=${text}`, '_blank')
}