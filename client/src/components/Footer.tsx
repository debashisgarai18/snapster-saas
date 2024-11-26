import { useMode } from "../hooks/useMode";
import logo from "../../src/assets/logo.png";
import { RiTwitterXLine } from "react-icons/ri";
import { IoLogoGithub } from "react-icons/io5";
import { TiSocialLinkedin } from "react-icons/ti";
import { useNavigate } from "react-router-dom";

export default function RenderFooter() {
  // hooks
  const { isDark } = useMode();
  const nav = useNavigate();

  return (
    <div
      className={`w-full flex px-[0.75rem] md:px-0  items-center py-[1rem] justify-center ${
        isDark ? "dark" : "light"
      }`}
    >
      <div className="w-full md:w-[80%] flex items-center justify-between">
        <div className="flex items-center gap-[1rem] md:gap-[2.75rem]">
          <div
            className="flex items-center justify-center gap-[0.75rem] cursor-pointer"
            onClick={() => nav("/")}
          >
            <div className="w-[2.5rem] h-[2.5rem]">
              <img src={logo} alt="logo" className="w-full h-full" />
            </div>
            <div className="text-2xl hidden md:block font-bold">snapster</div>
          </div>
          <div className="text-xl hidden md:block">|</div>
          <div
            className={`text-xs ${
              isDark ? "text-white" : "text-[#545459]"
            } md:text-[14px] tracking-widest`}
          >
            <span className="hidden md:block">
              All right reserved. Copyright{" "}
            </span>
            @snapster
          </div>
        </div>
        <div className="flex items-center gap-[1rem]">
          <div
            className={`w-[35px] ${
              isDark ? "text-white" : "text-black"
            }  border-2 rounded-full h-[35px] flex items-center justify-center cursor-pointer hover:bg-gray-400 hover:text-white`}
          >
            <RiTwitterXLine />
          </div>
          <div
            className={`w-[35px] ${
              isDark ? "text-white" : "text-black"
            }  border-2 rounded-full h-[35px] flex items-center justify-center cursor-pointer hover:bg-gray-400 hover:text-white`}
          >
            <IoLogoGithub />
          </div>
          <div
            className={`w-[35px] ${
              isDark ? "text-white" : "text-black"
            }  border-2 rounded-full h-[35px] flex items-center justify-center cursor-pointer hover:bg-gray-400 hover:text-white`}
          >
            <TiSocialLinkedin />
          </div>
        </div>
      </div>
    </div>
  );
}
