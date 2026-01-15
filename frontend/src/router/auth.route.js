import { lazy } from "react";

const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));

export default [
    { path: "login", Component: Login },
    { path: "register", Component: Register },
];
