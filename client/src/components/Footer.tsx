import { useMode } from "../hooks/useMode";
import logo from "../../src/assets/logo.png";
import { RiTwitterXLine } from "react-icons/ri";
import { IoLogoGithub } from "react-icons/io5";
import { TiSocialLinkedin } from "react-icons/ti";

export default function RenderFooter() {
  const { isDark } = useMode();
  return (
    <div
      className={`w-full flex items-center py-[1rem] justify-center ${
        isDark ? "dark" : "light"
      }`}
    >
      <div className="w-[80%] flex items-center justify-between">
        <div className="flex items-center gap-[2.75rem]">
          <div className="flex items-center justify-center gap-[0.75rem]">
            <div className="w-[2.5rem] h-[2.5rem]">
              <img src={logo} alt="logo" className="w-full h-full" />
            </div>
            <div className="text-2xl font-bold">snapster</div>
          </div>
          <div className="text-xl">|</div>
          <div className="text-[14px] tracking-widest text-[#545459]">
            All right reserved. Copyright @snapster
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
