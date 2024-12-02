import axios, { AxiosError } from "axios";
import { useMode } from "../hooks/useMode";
import { motion } from "motion/react";
import Swal from "sweetalert2";

 // copied from internet
 declare global {
  interface Window {
    // todo : solve this
    Razorpay : any;
  }  
}

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

  // function to initialise payment
  const initializePayment = async (order: {
    amount: number;
    currency: string;
    id: string;
    receipt: string;
  }) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Credit Payment",
      description: "For Payment of the Credits",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (resp: {
        razorpay_payment_id: string;
        razorpay_order_id: string;
        razorpay_signature: string;
      }) => {
        console.log(resp);
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  // function to buy credits
  const handleBuyCredits = async (planId: string) => {
    try {
      const resp = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/buyCredits?planId=${planId}`,
        {},
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      // if the order status is true, tehn only the payment should be initialised
      if (resp.data.orderStatus) {
        initializePayment(resp.data.orders);
      }
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      if (
        error.response?.data.message === "No auth hader provided" ||
        error.response?.data.message === "No token provided" ||
        error.response?.data.message === "User not Authenticated"
      ) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "You are not logged in",
        });
      }
      console.log(`Some endpoint error : ${error.response?.data.message}`);
    }
  };
  return (
    <>
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.2 }}
        className={`${
          isDark ? "bg-[#202020] text-white" : "bg-white text-black"
        } flex flex-col gap-[2rem] p-[1.75rem] md:p-[2rem] shadow-xl rounded-xl`}
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
            onClick={() => handleBuyCredits(data.category)}
          >
            Buy Now
          </button>
        </div>
      </motion.div>
    </>
  );
}
