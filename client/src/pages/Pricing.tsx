import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useMode } from "../hooks/useMode";
import useLaoding from "../hooks/useLoading";
import { Loader } from "../components/Loader";
import { motion } from "motion/react";
import logo from "../assets/logo.png";
import PriceCard from "../components/PriceCard";

const pricingData = [
  {
    image: logo,
    category: "Basic",
    desc: "Best for personal use.",
    pricing: "$10",
    perCredits: "100 credits",
  },
  {
    image: logo,
    category: "Advanced",
    desc: "Best for business use.",
    pricing: "$50",
    perCredits: "500 credits",
  },

  {
    image: logo,
    category: "Business",
    desc: "Best for enterprise use.",
    pricing: "$250",
    perCredits: "1000 credits",
  },
];

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
      className={`${
        isDark ? "dark" : "light"
      } md:overflow-hidden overflow-y-scroll flex flex-col items-center gap-[2rem] w-full`}
      style={{ height: "calc(100vh - 9.3rem)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full pt-[3rem] flex flex-col items-center gap-[2rem]"
      >
        <div
          className={`text-[14px] leading-[28px] px-[2rem] py-[0.5rem] border border-[#C1C1C1] rounded-full bg-[##F7FBFF] ${
            isDark ? "text-white" : "text-black"
          } uppercase`}
        >
          our plans
        </div>
      </motion.div>
      <div className="text-[35px] leading-[80px] font-medium text-center tracking-wide">
        Choose the plan
      </div>
      <div className="w-[95%] md:w-[60%] px-[1.5rem] md:px-0 grid grid-cols-1 gap-[1rem] md:grid-cols-3">
        {pricingData.map((e, _) => {
          return (
            <>
              <PriceCard data={e} key={_} />
            </>
          );
        })}
      </div>
    </div>
  );
}
