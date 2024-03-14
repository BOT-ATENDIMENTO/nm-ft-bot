import axios from "axios";


export const apiWhatsApp = axios.create({
    headers: {
        'x-api-key': "api.rafaeloliveira.dev.br"
    },
    baseURL: `${import.meta.env.VITE_URL_WHATSAPP_API}`
})