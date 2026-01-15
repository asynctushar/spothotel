// import { lazy } from "react";

import Login from "@/pages/Login";
import Register from "@/pages/Register";

// const Login = lazy(() => import("@/pages/Login"));
// const Register = lazy(() => import("@/pages/Register"));

export default [
    { path: "login", Component: Login },
    { path: "register", Component: Register },
];
