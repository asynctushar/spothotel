import axios from "../lib/axios";


export const payment = (data) =>
    axios.post("/bookings/payment", data);

export const getStripePublicKey = () =>
    axios.get("/bookings/stripepublicapikey");