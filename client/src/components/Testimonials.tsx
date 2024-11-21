import { useMode } from "../hooks/useMode";
import Rating from "./Rating";

export default function Testimonials({
  data,
}: {
  data: {
    name: string;
    designation: string;
    rating: number;
    info: string;
    avatar: string;
  };
}) {
  const { isDark } = useMode();

  return (
    <div className="px-[1rem] py-[1.5rem] shadow-lg flex border-2 rounded-lg flex-col items-center justify-center gap-[1rem]">
      <div className="w-[42.4px] h-[42.4px] rounded-full">
        <img
          src={data.avatar}
          alt="image"
          className="w-full h-full object-cover rounded-full"
        />
      </div>
      <div className="w-full flex flex-col gap-[0.3rem]">
        <div className="text-[18px]  tracking-wide text-center  w-full font-medium">
          {data.name}
        </div>
        <div
          className={`text-[13px] tracking-wide w-full text-center font-medium ${
            isDark ? "text-white" : "text-[#545454]"
          }`}
        >
          {data.designation}
        </div>
      </div>
      <Rating n={data.rating} />
      <div className={`text-[13px] tracking-wide w-[80%] text-center  ${
            isDark ? "text-white" : "text-[#545454]"
          }`}>
          {data.info}
      </div>
    </div>
  );
}
