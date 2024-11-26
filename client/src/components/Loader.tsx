import CircularProgress from "@mui/material/CircularProgress";

export const Loader = ({ textColor }: { textColor? : string }) => {
  return (
    <div className="w-full h-screen flex flex-col gap-[1rem] items-center justify-center">
      <CircularProgress size="5rem" />
      <div className={`text-3xl font-semibold ${textColor ? textColor : "text-white"} `}>
        Loading...
      </div>
    </div>
  );
};
