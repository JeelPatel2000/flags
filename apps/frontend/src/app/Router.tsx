import LandingPage from '../pages/LandingPage';
import { Route, Routes } from 'react-router-dom';

const ROUTES = [
  {
    path: '/',
    component: () => <LandingPage />,
  },
];

function Router() {
  return (
    <Routes>
      {ROUTES.map((route) => (
        <Route key={route.path} path={route.path} element={route.component()} />
      ))}
      {/* <Route path="*" element={<Page404 />} /> */}
    </Routes>
  );
}

export default Router;
