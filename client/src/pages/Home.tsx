import { demoAssets } from "../assets/demoImg/demoImg";
import ButtonComponent from "../components/ButtonComponent";
import { useMode } from "../hooks/useMode";
import { FaEye } from "react-icons/fa6";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { FiDownload } from "react-icons/fi";
import { cardPic } from "../assets/demoImg/demoImg";
import { dummyTestimonials } from "../assets/demoData/testimonials";
import Testimonials from "../components/Testimonials";
import Signup from "../components/Signup";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const howItWorks = [
  {
    title: "Describe Your Vision",
    content:
      "Type a phrase, sentence, or paragraph that describes the image you want to create.",
    icon: <FaEye />,
  },
  {
    title: "Watch the Magic",
    content:
      "Our AI-powered engine will transform your text into a high-quality, unique image in seconds.",
    icon: <FaWandMagicSparkles />,
  },
  {
    title: "Download & Share",
    content:
      "Instantly download your creation or share it with the world directly from our platform.",
    icon: <FiDownload />,
  },
];

export default function Home({
  auth,
  setAuth,
}: {
  auth: boolean;
  setAuth: () => void;
}) {
  // hooks
  const { isDark } = useMode();
  const nav = useNavigate();

  useEffect(() => {
    if (auth) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [auth]);

  return (
    <>
      {auth && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center">
          <Signup clicked={setAuth} />
        </div>
      )}
      <div
        className={`${
          isDark ? "dark" : "light"
        } flex justify-center min-h-screen w-full py-[3rem]`}
      >
        <div className="w-full flex flex-col items-center gap-[7rem] md:gap-[8.5rem] px-[2rem] md:px-0 md:w-[60%]">
          <div className="w-full flex flex-col items-center gap-[2rem] md:gap-[2rem]">
            <div className="px-[1rem] py-[0.5rem] rounded-full border-2 bg-white text-black font-medium">
              #1 Text to image generator ⭐
            </div>
            <div className="text-[40px] font-medium md:text-[80px] break-words w-[80%] md:w-[60%] text-center leading-[40px] md:leading-[80px]">
              Turn text to{" "}
              <span className="text-[#06AEFF] font-semibold">image</span>, in
              seconds.
            </div>
            <div
              className={`text-[14px] md:text-[18px] w-full md:w-[50%] leading-[18px] md:leading-[25.68px] text-center break-words ${
                isDark ? "text-white" : "text-[#545454]"
              } font-medium`}
            >
              Unleash your creativity with AI. Turn your imagination into visual
              art in seconds - just type, and watch the magic happen.
            </div>
            <ButtonComponent
              label="generate images ✨"
              width="w-[215px]"
              clicked={() => nav("/generate")}
            />
          </div>
          <div className="w-full flex flex-col items-center justify-center gap-[1rem]">
            <div className="w-full flex items-center justify-center gap-[0.75rem]">
              {demoAssets.map((e, idx) => {
                return (
                  <div
                    className="w-[5.5rem] h-[5.5rem] rounded-2xl shadow-xl"
                    key={idx}
                  >
                    <img
                      src={e}
                      alt="img"
                      className="w-full h-full rounded-2xl object-cover"
                    />
                  </div>
                );
              })}
            </div>
            <div
              className={`w-full text-center font-medium ${
                isDark ? "text-white" : "text-[#545454]"
              }`}
            >
              Generated images from snapster
            </div>
          </div>
          {/* // how it works part */}
          <div className="w-full flex flex-col items-center gap-[1.5rem]">
            <div className="w-full flex flex-col items-center justify-center">
              <div className="text-center font-medium text-[40px]">
                How it works
              </div>
              <div
                className={`w-full text-center font-medium ${
                  isDark ? "text-white" : "text-[#545454]"
                }`}
              >
                Transform Words Into Stunning Images
              </div>
            </div>
            {/* // how it works boxes */}
            <div className="w-full flex flex-col items-center gap-[1.75rem]">
              {howItWorks.map((e, _) => {
                return (
                  <div
                    className="border-2 flex gap-[1rem] rounded-xl shadow-lg items-center w-full md:w-[80%] px-[1rem] py-[1rem] cursor-pointer hover:scale-[1.02] transition-all duration-700"
                    key={_}
                  >
                    <div
                      className={`text-black w-[35px] h-[35px] md:w-[45px] md:h-[45px] text-xs md:text-base flex items-center justify-center bg-[#e1e9ff] rounded-2xl`}
                    >
                      {e.icon}
                    </div>
                    <div className="flex flex-col">
                      <div className="text-[14px] md:text-[20px] w-full font-semibold">
                        {e.title}
                      </div>
                      <div
                        className={`text-xs md:text-[15px] leading-[18.9px] tracking-wide w-full font-medium ${
                          isDark ? "text-white" : "text-[#545454]"
                        }`}
                      >
                        "{e.content}"
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* // create AI images part */}
          <div className="w-full flex flex-col items-center gap-[3.75rem]">
            <div className="w-full flex flex-col items-center">
              <div className="text-[40px] font-semibold">
                Create Images with AI ✨
              </div>
              <div
                className={`w-full text-center font-medium ${
                  isDark ? "text-white" : "text-[#545454]"
                }`}
              >
                Turn your imagination into visuals
              </div>
            </div>
            {/* // card part */}
            <div className="w-full flex flex-col md:flex-row justify-center items-center gap-[3rem]">
              <div className="w-full md:w-[393px] h-[393px] rounded-xl">
                <img
                  src={cardPic}
                  alt="card"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <div className="flex flex-col gap-[1.75rem] w-full md:w-calcCustom">
                <div
                  className={`text-[28px] leading-[38px] break-words w-full md:w-[70%] font-medium ${
                    isDark ? "text-white" : "text-[#545454]"
                  }`}
                >
                  Introducing the AI-Powered{" "}
                  <span className="text-[#06AEFF]">
                    Text to Image Generator
                  </span>
                </div>
                <div
                  className={`text-[16px] leading-[22px] w-full md:w-[80%] ${
                    isDark ? "text-white" : "text-[#545454]"
                  }`}
                >
                  Effortlessly materialize your concepts with our cutting-edge
                  AI-driven image generator. Whether you require captivating
                  visuals or bespoke graphics, our platform leverages advanced
                  algorithms to transform your descriptions into striking
                  imagery in seconds. Envision, articulate, and witness your
                  ideas take shape instantly.
                </div>
                <div
                  className={`text-[16px] leading-[22px] w-full md:w-[80%] ${
                    isDark ? "text-white" : "text-[#545454]"
                  }`}
                >
                  Input a text prompt, and our state-of-the-art AI swiftly
                  generates high-resolution imagery. From marketing assets to
                  conceptual designs and bespoke portraits, even abstract ideas
                  are seamlessly visualized. Leveraging advanced generative
                  algorithms, the creative potential is boundless!
                </div>
              </div>
            </div>
          </div>
          {/* // customer Testimonials */}
          <div className="w-full flex gap-[2.75rem] flex-col items-center">
            <div className="w-full flex flex-col items-center justify-center">
              <div className="text-center font-medium text-[40px]">
                Customer Testimonials
              </div>
              <div
                className={`w-full text-center font-medium ${
                  isDark ? "text-white" : "text-[#545454]"
                }`}
              >
                What Our Users Are Saying
              </div>
            </div>
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-[1.75rem]">
              {dummyTestimonials.map((e, _) => {
                return (
                  <div className="w-full" key={_}>
                    <Testimonials data={e} />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="w-full flex flex-col items-center gap-[1rem]">
            <div className="text-center font-medium text-[40px]">
              Excited?? Try Now 🎯
            </div>
            <ButtonComponent
              label="generate images ✨"
              width="w-[215px]"
              clicked={() => nav("/generate")}
            />
          </div>
        </div>
      </div>
    </>
  );
}
