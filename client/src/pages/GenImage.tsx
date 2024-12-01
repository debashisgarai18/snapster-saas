import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useMode } from "../hooks/useMode";
import DemoImg from "../assets/genImage.jpg";
import useLaoding from "../hooks/useLoading";
import { Loader } from "../components/Loader";
import { motion } from "motion/react";
import axios, { AxiosError } from "axios";

export default function GenImage({
  updateCredits,
}: {
  updateCredits: (e: number | undefined) => void;
}) {
  // states
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>(DemoImg);
  const [prompt, setPrompt] = useState<string>("");
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const [loadingWidth, setLoadingWidth] = useState<number | undefined>(
    undefined
  );

  // hooks
  const { isSignedin } = useAuth();
  const nav = useNavigate();
  const { isDark } = useMode();
  const { isLoading, setLoading } = useLaoding();

  // function to generate image
  const generateImage = async () => {
    try {
      setLoadingWidth(0);
      setShowLoading((prev) => !prev);
      const resp = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/genImage`,
        { prompt },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      if (resp) {
        setLoadingWidth(100);
        setShowLoading((prev) => !prev);
        setImageUrl(resp.data.imgUrl);
        updateCredits(resp.data.credits);
        setIsImageLoaded((prev) => !prev);
      }
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      if (error.response?.data?.message === "Not enough credits") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response?.data?.message,
        });
        nav("/pricing");
      }
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response?.data?.message,
      });
    }
  };

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
      <div className="w-full md:w-[50%] flex flex-col items-center py-[3rem] gap-[3.75rem] px-[1rem] md:px-0">
        <div className="w-[358px] h-[358px] relative rounded-lg shadow-lg">
          <motion.img
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.2 }}
            src={imageUrl}
            alt="demo"
            className="w-full h-full rounded-lg"
          />
          <span
            className="h-[0.3rem] absolute bottom-0 rounded-b-lg bg-[#007AFF] transition-all duration-500 ease-in-out"
            style={{
              width: `${loadingWidth === undefined ? 0 : loadingWidth}%`,
            }}
          ></span>
          {showLoading && <div>Loading...</div>}
        </div>
        {isImageLoaded ? (
          <div className="w-full md:w-[70%] flex gap-[1rem] items-center justify-center">
            <button
              className="py-[0.8rem] px-[2rem] bg-black cursor-pointer font-medium text-white rounded-full"
              onClick={() => setIsImageLoaded((prev) => !prev)}
            >
              Generate More
            </button>
            <button className="py-[0.8rem] px-[2rem] bg-black cursor-pointer font-medium text-white rounded-full">
              <a href={imageUrl} download>
                Download Now
              </a>
            </button>
          </div>
        ) : (
          <div className="w-full md:w-[70%] rounded-full relative flex shadow-lg">
            <input
              type="text"
              className="w-full py-[0.8rem] rounded-full text-white px-[2rem] bg-[#6B6B6B] font-medium outline-none"
              placeholder="Enter your prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <button
              className="absolute right-0 py-[0.8rem] px-[2rem] bg-black cursor-pointer font-medium text-white rounded-full"
              onClick={generateImage}
            >
              Generate
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
