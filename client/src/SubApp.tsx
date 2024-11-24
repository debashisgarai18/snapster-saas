import { lazy, Suspense, useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthContext } from "./context/context";
import Navbar from "./components/Navbar";
import RenderFooter from "./components/Footer";
import { AxiosError } from "axios";
import Swal from "sweetalert2";
import axios from "axios";

const Home = lazy(() => import("./pages/Home"));
const Pricing = lazy(() => import("./pages/Pricing"));

export default function SubApp() {
  const url = import.meta.env.VITE_BACKEND_URL;

  // states
  const [user, setUser] = useState<string | undefined>(undefined);
  const [credits, setCredits] = useState<number | undefined>(undefined);
  const [authMenu, setAuthMenu] = useState<boolean>(false)

  // global state
  const [isSignedin, setIsSignedIn] = useState<boolean>(() => {
    if (localStorage.getItem("token")) {
      return true;
    } else {
      return false;
    }
  });

  // auth check
  useEffect(() => {
    (async function () {
      if (localStorage.getItem("token")) {
        // check for me endpoint
        try {
          const resp = await axios.get(`${url}/user/me`, {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          });
          if (resp) {
            setUser(resp.data.user.name);
            setCredits(resp.data.user.credits);
            setIsSignedIn(true);
          }
        } catch (err) {
          const error = err as AxiosError<{
            message?: string;
            feedback?: string;
          }>;
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.response?.data?.message,
          });
        }
      } else {
        setIsSignedIn(false);
      }
    })();
  }, [url, isSignedin]);

  return (
    <>
      <AuthContext.Provider value={{ isSignedin, setIsSignedIn }}>
        <Suspense fallback={<Loader />}>
          <BrowserRouter>
            <Navbar data={{ user: user, credits: credits }} auth={authMenu} setAuth={() =>  setAuthMenu(prev => !prev)} />
            <Routes>
              <Route path="/" element={<Home auth={authMenu} setAuth={() =>  setAuthMenu(prev => !prev)}/>} />
              <Route path="/pricing" element={<Pricing />} />
            </Routes>
            <RenderFooter />
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
