import "./App.css";
import {RouterProvider } from "react-router-dom";
import React from "react";
import LazyLoader from "./Components/LazyLoader/LazyLoader";
import { router } from "./Routes/Routes";



function App() {
 
  return (
    <React.Suspense fallback={<LazyLoader />}>
      <RouterProvider router={router} />
    </React.Suspense>
  );
}

export default App;
