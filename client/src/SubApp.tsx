import { lazy, Suspense } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { BrowserRouter, Route, Routes } from "react-router-dom";
const Home = lazy(() => import("./pages/Home"));
const Pricing = lazy(() => import("./pages/Pricing"));

export default function SubApp() {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pricing" element={<Pricing />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </>
  );
}

export const Loader = () => {
  return (
    <div className="w-screen h-screen flex flex-col gap-[1rem] items-center justify-center">
      <CircularProgress size="5rem" />
      <div className="text-3xl font-semibold">Loading...</div>
    </div>
  );
};
