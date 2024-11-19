import ButtonComponent from "../components/ButtonComponent";
import { useMode } from "../hooks/useMode";

export default function Home() {
  // hooks
  const { isDark } = useMode();

  return (
    <div
      className={`${
        isDark ? "dark" : "light"
      } flex justify-center min-h-screen w-full py-[3rem]`}
    >
      <div className="w-full flex flex-col items-center gap-[2rem] md:gap-[2.75rem] px-[2rem] md:px-0 md:w-[60%] h-[100px]">
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
          Unleash your creativity with AI. Turn your imagination into visual art
          in seconds - just type, and watch the magic happen.
        </div>
        <ButtonComponent
          label="generate images ✨"
          width="w-[215px]"
          clicked={() => console.log("do nothing")}
        />
      </div>
    </div>
  );
}
