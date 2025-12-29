import axios from "../utils/axios";

export const register = (credentials) =>
    axios.post("/auth/register", credentials);

export const login = (credentials) =>
    axios.post("/auth/login", credentials);

export const logout = () =>
    axios.get("/auth/logout");

export const getMe = () =>
    axios.get("/users/me");
