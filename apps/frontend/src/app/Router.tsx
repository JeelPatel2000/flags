import LandingPage from "../pages/LandingPage";
import { Route, Routes } from "react-router-dom";
import SignIn from "../pages/signin";
import Register from "../pages/register";

const ROUTES = [
    {
        path: "/",
        component: () => <LandingPage />,
    },
    {
        path: "/signin",
        component: () => <SignIn />,
    },
    {
        path: "/register",
        component: () => <Register />,
    },
];

function Router() {
    return (
        <Routes>
            {ROUTES.map((route) => (
                <Route
                    key={route.path}
                    path={route.path}
                    element={route.component()}
                />
            ))}
            {/* <Route path="*" element={<Page404 />} /> */}
        </Routes>
    );
}

export default Router;
