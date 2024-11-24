import { useState } from "react";
import { signupType } from "@deba018/blogs-common";
import { IoCloseSharp } from "react-icons/io5";

export default function Signup({ clicked }: { clicked: () => void }) {
  // states
  const [authType, setAuthType] = useState<{ type: "signin" | "signup" }>({
    type: "signin",
  });
  const [formData, setFormData] = useState<signupType>({
    name: "",
    username: "",
    pwd: "",
  });

  return (
    <>
      <div className="w-full px-[1rem] md:px-0 h-screen flex items-center justify-center absolute">
        <div
          className={`w-full md:w-[30%] bg-white shadow-lg relative rounded-xl px-[1.75rem] py-[2.75rem] `}
        >
          <div
            className="absolute top-3 right-3 cursor-pointer text-xl"
            onClick={clicked}
          >
            <IoCloseSharp />
          </div>
          {authType.type === "signin" ? (
            <FormArea
              headerText="Welcome back! Please sign in to continue"
              heading="Login"
              bottomText="Don't have an account?"
              link="Sign up"
              type="signin"
              setData={(e) => setFormData(e)}
              data={formData}
              auth={(e: "signup" | "signin") => setAuthType({ type: e })}
            />
          ) : (
            <FormArea
              headerText="Get started! Please sign up to continue"
              heading="Signup"
              bottomText="Already have an account?"
              link="Sign in"
              type="signup"
              setData={(e) => setFormData(e)}
              data={formData}
              auth={(e: "signup" | "signin") => setAuthType({ type: e })}
            />
          )}
        </div>
      </div>
    </>
  );
}

const FormArea = ({
  heading,
  headerText,
  bottomText,
  link,
  type,
  setData,
  data,
  auth,
}: {
  heading: string;
  headerText: string;
  bottomText: string;
  link: string;
  type: "signup" | "signin";
  data: signupType;
  setData: (e: signupType) => void;
  auth: (e: "signup" | "signin") => void;
}) => {
  return (
    <div className="w-full flex flex-col gap-[2.5rem]">
      <div className="w-full flex flex-col items-center gap-[0.5rem]">
        <div className="text-[28px] leading-[35px] font-semibold">
          {heading}
        </div>
        <div className="text-[14px] leading-[17px] text-[#575B86]">
          {headerText}
        </div>
      </div>
      <div className="w-full flex flex-col gap-[0.75rem]">
        {type === "signin" ? (
          <>
            <FormInputBox
              placeholder="Email"
              type="text"
              onChange={(e) => setData({ ...data, username: e.target.value })}
            />
            <FormInputBox
              placeholder="Password"
              type="password"
              onChange={(e) => setData({ ...data, pwd: e.target.value })}
            />
          </>
        ) : (
          <>
            <FormInputBox
              placeholder="Name"
              type="text"
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
            <FormInputBox
              placeholder="Email"
              type="text"
              onChange={(e) => setData({ ...data, username: e.target.value })}
            />
            <FormInputBox
              placeholder="Password"
              type="password"
              onChange={(e) => setData({ ...data, pwd: e.target.value })}
            />
          </>
        )}
        <div className="w-full text-[14px] leading-[17px] text-[#007AFF]">
          {type === "signin" && "Forgot Password?"}
        </div>
      </div>
      <button className="w-full py-[1rem] text-white bg-[#007AFF] text-[16px] rounded-full leading-[20px]">
        {type === "signin" ? "Login" : "Signup"}
      </button>
      <div className="w-full text-[15px] leading-[18px] flex items-center justify-center gap-[0.5rem]">
        <div>{bottomText}</div>
        <div
          className="text-[#007AFF] underline cursor-pointer"
          onClick={() => auth(link === "Sign up" ? "signup" : "signin")}
        >
          {link}
        </div>
      </div>
    </div>
  );
};

const FormInputBox = ({
  placeholder,
  type,
  onChange,
}: {
  placeholder: string;
  type: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="w-full border-2 rounded-full px-[1rem] py-[0.75rem] text-[14px] leading-[17px]">
      <input
        type={type}
        className="w-full outline-none"
        placeholder={placeholder}
        onChange={(e) => onChange(e)}
      />
    </div>
  );
};
