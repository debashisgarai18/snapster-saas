import { lazy, Suspense, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthContext } from "./context/context";
import Navbar from "./components/Navbar";
const Home = lazy(() => import("./pages/Home"));
const Pricing = lazy(() => import("./pages/Pricing"));


export default function SubApp() {
  // global state
  // todo: do the me endpoint check and provide the signed in value according to that
  const [isSignedin, setIsSignedIn] = useState<boolean>(false);
    

  return (
    <>
      <AuthContext.Provider value={{ isSignedin, setIsSignedIn }}>
        <Suspense fallback={<Loader />}>
          <BrowserRouter>
          <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/pricing" element={<Pricing />} />
            </Routes>
          </BrowserRouter>
        </Suspense>
      </AuthContext.Provider>
    </>
  );
}

export const Loader = () => {
  return (
    <div className="w-full h-screen flex flex-col gap-[1rem] items-center justify-center">
      <CircularProgress size="5rem" />
      <div className="text-3xl font-semibold">Loading...</div>
    </div>
  );
};
