import CircularProgress from "@mui/material/CircularProgress";

export const Loader = () => {
    return (
      <div className="w-full h-screen flex flex-col gap-[1rem] items-center justify-center">
        <CircularProgress size="5rem" />
        <div className={`text-3xl font-semibold text-white`}>Loading...</div>
      </div>
    );
  };
  