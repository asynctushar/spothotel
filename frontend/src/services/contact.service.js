import axios from "axios";

export const sendContactMessage = (data) =>
    axios.post("https://asynctushar.vercel.app/api/public/message", {
        name: data.name,
        email: data.email,
        message: data.message,
        subject: "New Contact Message from SpotHotel",
    });