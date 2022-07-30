import { Route, Routes } from "react-router-dom";
import { Docs, LandingPage, Register, SignIn } from "../pages";
import AddProject from "../pages/addProject";
import Dashboard from "../pages/dashboard";
import Home from "../pages/home";
import Logout from "../pages/logout";
import ProjectDetails from "../pages/projectDetails";
import Projects from "../pages/projects";
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
        routes: [
            { path: "/", component: () => <Home /> },
            { path: "/add_project", component: () => <AddProject /> },
            { path: "/projects", component: () => <Projects /> },
            {
                path: "/project_details/:projectId",
                component: () => <ProjectDetails />,
            },
        ],
    },
    {
        path: "/logout",
        component: () => <Logout />,
    },
    {
        path: "/docs",
        component: () => <Docs />,
    },
];

function Router() {
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
