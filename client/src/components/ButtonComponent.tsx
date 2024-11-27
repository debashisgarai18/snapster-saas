import { useMode } from "../hooks/useMode";
import { motion } from "motion/react";

export default function ButtonComponent({
  label,
  width,
  textSize,
  icon,
  clicked,
}: {
  label: string;
  width?: string;
  textSize?: string;
  icon?: JSX.Element;
  clicked: () => void;
}) {
  const { isDark } = useMode();

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.8 }}
      className={`${width ? width : "w-full"} ${
        isDark ? "light" : "dark"
      } text-center ${
        textSize ? textSize : "text-base"
      } capitalize px-[2rem] py-[0.5rem] flex cursor-pointer items-center gap-[0.5rem] font-medium rounded-full active:translate-y-[1px] shadow-lg`}
      onClick={clicked}
    >
      <div>{label}</div>
      {icon && <div>{icon}</div>}
    </motion.div>
  );
}
