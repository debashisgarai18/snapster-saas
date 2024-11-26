import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useMode } from "../hooks/useMode";
import useLaoding from "../hooks/useLoading";
import { Loader } from "../components/Loader";

export default function Pricing() {
  // hooks
  const { isSignedin } = useAuth();
  const nav = useNavigate();
  const { isDark } = useMode();
  const { isLoading, setLoading } = useLaoding();

  // check for the user logged in thing
  useEffect(() => {
    (async function () {
      if (!isSignedin) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "You are not logged in",
        });
        nav("/");
      } else {
        setLoading((prev) => !prev);
        await new Promise((r) => setTimeout(r, 1000));
        setLoading((prev) => !prev);
      }
    })();
  }, [isSignedin, nav, setLoading]);

  if (isLoading) {
    return (
      <div
        className={`fixed inset-0 z-50 ${
          isDark ? "dark" : "light"
        }  backdrop-blur-sm flex items-center justify-center`}
      >
        <Loader textColor={isDark ? "text-white" : "text-black"} />
      </div>
    );
  }

  return (
    <div
      className={`${isDark ? "dark" : "light"} flex justify-center w-full`}
      style={{ height: "calc(100vh - 9.3rem)" }}
    >
      <div className="w-full pt-[3rem] flex flex-col items-center gap-[2rem]">
        <div className="text-[14px] leading-[28px] px-[2rem] py-[0.3rem] border border-[#C1C1C1] rounded-full bg-[##F7FBFF] text-black uppercase">
          our plans
        </div>
      </div>
    </div>
  );
}
