import { useMode } from "../hooks/useMode";

export default function PriceCard({
  data,
}: {
  data: {
    image: string;
    category: string;
    desc: string;
    pricing: string;
    perCredits: string;
  };
}) {
  // hooks
  const { isDark } = useMode();
  return (
    <>
      <div
        className={`${
          isDark ? "bg-[#202020] text-white" : "bg-white text-black"
        } flex flex-col gap-[2rem] px-[2rem] py-[2rem] shadow-xl rounded-xl`}
      >
        <div className="w-[31px] h-[31px]">
          <img src={data.image} alt="logo" className="w-full h-full" />
        </div>
        <div className=" flex flex-col gap-[0.2rem]">
          <div className="text-[20px] font-semibold leading-[28px]">
            {data.category}
          </div>
          <div className="text-[15px] leading-[28px]">{data.desc}</div>
        </div>
        <div className="flex gap-[0.5rem]">
          <div className="text-[34px] leading-[28px] font-bold">
            {data.pricing}
          </div>
          <div className="text-[14px] leading-[28px]">/ {data.perCredits}</div>
        </div>
        <div className="w-full flex items-center justify-center">
          <button
            className={`w-[50%] text-center ${
              isDark ? "light" : "dark"
            } text-[15px] leading-[28px] py-[0.5rem] rounded-xl font-medium`}
          >
            Buy Now
          </button>
        </div>
      </div>
    </>
  );
}