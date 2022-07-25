import { Route, Routes } from "react-router-dom";
import { Docs, LandingPage, Register, SignIn } from "../pages";
import Dashboard from "../pages/dashboard";
import Home from "../pages/home";
import Logout from "../pages/logout";
import { getCurrentUser } from "../services/authService";

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
    {
        path: "/docs",
        component: () => <Docs />,
    },
];

const AUTH_ROUTES = [
    {
        path: "/",
        component: () => <Dashboard />,
        routes: [{ path: "/", component: () => <Home /> }],
    },
    {
        path: "/logout",
        component: () => <Logout />,
    },
];

function Router() {
    const user = getCurrentUser();

    console.log(user);

    return (
        <Routes>
            {getCurrentUser()
                ? AUTH_ROUTES.map((route) => (
                      <Route
                          key={route.path}
                          path={route.path}
                          element={route.component()}
                      >
                          {route.routes &&
                              route.routes.map((subRoute) => (
                                  <Route
                                      key={subRoute.path}
                                      path={subRoute.path}
                                      element={subRoute.component()}
                                  />
                              ))}
                      </Route>
                  ))
                : ROUTES.map((route) => (
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
