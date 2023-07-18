import React from 'react'
import { ProtectUser } from '../Utils/ProtectUser';
import NotFound from '../Pages/ErrorPage/NotFound';
import AuthProtection from '../Utils/authprotection';
import { createBrowserRouter } from 'react-router-dom';
import Protected from '../Components/AuthGuard/Protected';


const LazyDashboard = React.lazy(() => import("../Pages/Dashboard/Dashboard"));
const LazyReport = React.lazy(() => import("../Pages/TeamUpdates/Report"));
const LazySignIn = React.lazy(() => import("../Pages/AuthPages/SignIn"));
const LazySignUp = React.lazy(() => import("../Pages/AuthPages/SignUp"));
const LazyUpdateReport = React.lazy(() => import("../Pages/TeamUpdates/UpdateReport"))


export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthProtection Component={LazySignIn} />,
  },
  {
    path: "/signup",
    element: <AuthProtection Component={LazySignUp} />,
  },
  {
    path: "/dashboard",
    element: <ProtectUser Component={LazyDashboard} />,
  },
  {
    path: "/dashboard/report/:id",
    element: <Protected Component={LazyReport} />,
  },
  {
    path: "dashboard/updateUpdates/:id",
    element: <ProtectUser Component={LazyUpdateReport} />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
