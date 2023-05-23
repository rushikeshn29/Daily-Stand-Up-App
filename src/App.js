import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import NotFound from "./Components/NotFound";
import Protected from "./Components/Protected";
import React from "react";
import LazyLoader from "./Components/LazyLoader";

const LazyDashboard = React.lazy(() => import("./Components/Dashboard"));
// const LazyCreate = React.lazy(() => import("./Components/Create"));
const LazySignin = React.lazy(() => import("./Components/Signin"));
const LazySignup = React.lazy(() => import("./Components/Signup"));
function App() {
 

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            exact
            element={ <React.Suspense fallback={<LazyLoader/>}>
            < LazySignin/>
          </React.Suspense> }
          ></Route>
          <Route
            path="/signup"
            exact
            element={ <React.Suspense fallback={<LazyLoader/>}>
             < LazySignup/>
          </React.Suspense> }
          ></Route>
          <Route
            path="/dashboard"
            element={
              <React.Suspense fallback={<LazyLoader/>}>
                <Protected Component={LazyDashboard} />
              </React.Suspense>
            }
          />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
