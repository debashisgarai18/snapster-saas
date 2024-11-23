import useAuth from "../hooks/useAuth";
import logo from "../../src/assets/logo.png";
import ButtonComponent from "./ButtonComponent";
import { FiMoon } from "react-icons/fi";
import { useMode } from "../hooks/useMode";
import { FiSun } from "react-icons/fi";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

// this is the generalized navbar for all the pages
// todo : get the user details from a global context and propagate here
export default function Navbar({
  data,
}: {
  data: {
    user: string | undefined;
    credits: number | undefined;
  };
}) {
  // states
  const [openDropdown, setOpendropdown] = useState<boolean>(false);

  // hooks
  const { isSignedin, setIsSignedIn } = useAuth();
  const { isDark, toggleMode } = useMode();

  return (
    <div
      className={`w-full ${
        isDark ? "dark" : "light"
      } flex  items-center justify-between py-[1rem] px-[1rem] md:px-[4rem]`}
    >
      <div className="flex items-center justify-center gap-[0.75rem]">
        <div className="w-[2.5rem] h-[2.5rem]">
          <img src={logo} alt="logo" className="w-full h-full" />
        </div>
        <div className="text-2xl font-bold">snapster</div>
      </div>
      {!isSignedin ? (
        <div className="flex items-center gap-[1rem]">
          <div onClick={toggleMode} className="cursor-pointer">
            {isDark ? (
              <div>
                <FiSun />
              </div>
            ) : (
              <div>
                <FiMoon />
              </div>
            )}
          </div>
          <div className="font-medium hidden md:block">Pricing</div>
          <div className="font-medium block md:hidden">
            <FaIndianRupeeSign />
          </div>
          <ButtonComponent
            label="Login"
            clicked={() => setIsSignedIn((prev) => !prev)}
          />
        </div>
      ) : (
        <div className="flex items-center gap-[1rem]">
          <div onClick={toggleMode} className="cursor-pointer">
            {isDark ? (
              <div>
                <FiSun />
              </div>
            ) : (
              <div>
                <FiMoon />
              </div>
            )}
          </div>
          <div className="flex items-center gap-[0.5rem] bg-[#D7EBFF] rounded-full px-[1rem] py-[0.5rem] shadow-md">
            <div className="w-[23px] text-xs text-white h-[23px] rounded-full bg-[#007AFF] flex items-center justify-center">
              <FaStar />
            </div>
            <div
              className={`text-[15px] text-xs leading-[28px] font-medium text-black`}
            >
              <div className="flex items-center gap-[0.3rem]">
                <div className="hidden md:block">Credits Left : </div>
                <div>{data.credits}</div>
              </div>
            </div>
          </div>
          <div className="text-[15px] leading-[18.9px] hidden md:block font-medium">
            Hi, {data.user}
          </div>
          {openDropdown ? (
            <DropdownMenu>
              <DropdownMenuTrigger
                className="w-[45px] h-[45px] text-black cursor-pointer shadow-md flex items-center justify-center bg-white rounded-full"
                onClick={() => setOpendropdown((prev) => !prev)}
              >
                <FaRegUser />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div
              className="w-[45px] h-[45px] text-black cursor-pointer shadow-md flex items-center justify-center bg-white rounded-full"
              onClick={() => setOpendropdown((prev) => !prev)}
            >
              <FaRegUser />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
