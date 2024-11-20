import { demoAssets } from "../assets/demoImg/demoImg";
import ButtonComponent from "../components/ButtonComponent";
import { useMode } from "../hooks/useMode";
import { FaEye } from "react-icons/fa6";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { FiDownload } from "react-icons/fi";

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

export default function Home() {
  // hooks
  const { isDark } = useMode();

  return (
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
            clicked={() => console.log("do nothing")}
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
          <div className="w-full flex flex-col gap-[1rem]">
              {
                howItWorks.map((e, _) => {
                    return <div className="border-2 flex gap-[1rem] items-center w-full px-[1rem] py-[0.75rem]" key={_}>
                        <div className="w-[3rem] h-[3rem] flex items-cente justify-center">
                            {e.icon}
                        </div>
                        <div className="flex flex-col gap-[0.75rem]">
                            <div className="text-[20px] w-full">{e.title}</div>
                            <div className="text-[15px] w-full">"{e.content}"</div>
                        </div>
                    </div>
                })
              }
          </div>
        </div>
      </div>
    </div>
  );
}
