import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Context, Hono } from "hono";
import { signupAuth } from "../Middlewares/authVal";
import { signinType, signupType } from "@deba018/blogs-common";
import { sign } from "hono/jwt";
import { userAuthCheck } from "../Middlewares/authCheck";
import { AxiosError } from "axios";
import FormData from "form-data";
import { Buffer } from "buffer";
import Razorpay from "razorpay";

const userRoute = new Hono();

// endpoint for the user auth for each page
userRoute.get("/me", userAuthCheck, async (c: Context) => {
  // get the user details
  const userId = c.get("user");

  // init prisma
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const resp = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        name: true,
        email: true,
        credits: true,
      },
    });
    if (resp) {
      c.status(200);
      return c.json({
        message: "Authenticated",
        user: resp,
      });
    }
  } catch (err) {
    c.status(500);
    return c.json({
      err: err,
      message: "Internal Server Error",
    });
  }
});

// endpoint for singnup the user
userRoute.post("/signup", signupAuth, async (c: Context) => {
  const body: signupType = await c.req.json();

  // init prisma
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    // check for the existing user
    const userPresent = await prisma.user.findUnique({
      where: {
        email: body.username,
      },
    });
    if (userPresent) {
      c.status(404);
      return c.json({
        message: "This user is already present",
      });
    } else {
      try {
        // todo : store the hashesd password via bcrypt
        const resp = await prisma.user.create({
          data: {
            name: body.name,
            email: body.username,
            password: body.pwd,
          },
        });
        const token = await sign({ id: resp.id }, c.env.JWT_SECRET);
        return c.json({
          message: "The user is created",
          token: token,
        });
      } catch (err) {
        c.status(404);
        return c.json({
          message: "Unable to create the user",
        });
      }
    }
  } catch (err) {
    c.status(500);
    return c.json({
      error: err,
      message: "Internal Server Error",
    });
  }
});

// endpoint to signin the user
userRoute.post("/signin", async (c: Context) => {
  const body: signinType = await c.req.json();

  // init prisma
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    // check for user exists
    const userPresent = await prisma.user.findUnique({
      where: {
        email: body.username,
      },
    });
    if (userPresent) {
      // if user present check for the password
      if (userPresent.password === body.pwd) {
        const token = await sign({ id: userPresent.id }, c.env.JWT_SECRET);
        c.status(200);
        return c.json({
          message: "Signedin Successfully",
          token: token,
        });
      } else {
        c.status(403);
        return c.json({
          message: "Incorrect Password",
        });
      }
    } else {
      c.status(404);
      return c.json({
        message: "The user is not found",
      });
    }
  } catch (err) {
    c.status(500);
    return c.json({
      error: err,
      message: "Internal Server Error",
    });
  }
});

// endpoint to generate the image
userRoute.post("/genImage", userAuthCheck, async (c: Context) => {
  // init prisma
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const userId = c.get("user");
  const { prompt } = await c.req.json();

  try {
    // check for the credits in the user's account
    const checkCredits = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        credits: true,
      },
    });
    if (checkCredits?.credits === 0) {
      c.status(403);
      return c.json({
        message: "Not enough credits",
      });
    }

    const form = new FormData();
    form.append("prompt", prompt);
    try {
      const resp = await fetch("https://clipdrop-api.co/text-to-image/v1", {
        method: "POST",
        headers: {
          "x-api-key": c.env.CLIP_DROP_API_KEY,
        },
        //@ts-ignore
        body: form,
      });
      // generating the image url in .png from the arraybuffer
      //@ts-ignore
      const base64Image = Buffer.from(
        await resp.arrayBuffer(),
        "binary"
      ).toString("base64");
      const imageUrl = `data:image/png;base64,${base64Image}`;

      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          credits: {
            decrement: 1,
          },
        },
      });

      const userCredits = await prisma.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          credits: true,
        },
      });

      c.status(200);
      return c.json({
        message: "The Image has been generated",
        imgUrl: imageUrl,
        credits: userCredits?.credits,
      });
    } catch (error) {
      const err = error as AxiosError;
      console.log(err.response?.data);
      c.status(404);
      return c.json({
        message: `Some error occured : ${error}`,
      });
    }
  } catch (err) {
    c.status(500);
    return c.json({
      message: `Some internal server error : ${err}`,
    });
  }
});

// endpoint to trigger the razorpay api
userRoute.post("/buyCredits", userAuthCheck, async (c: Context) => {
  // instance for razorpay
  const razorpayInstance = new Razorpay({
    key_id: c.env.RAZORPAY_KEY_ID,
    key_secret: c.env.RAZORPAY_KEY_SECRET,
  });

  // init prisma
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const userId: string = c.get("user");
  const planId = c.req.query("planId");
  let credits,
    plan,
    amount,
    date = new Date();

  // create the plan variables for different plan IDs
  switch (planId) {
    case "Basic":
      (plan = "Basic"), (credits = 100), (amount = 10);
      break;
    case "Advanced":
      (plan = "Advanced"), (credits = 500), (amount = 50);
      break;
    case "Business":
      (plan = "Business"), (credits = 1000), (amount = 250);
      break;
    default:
      c.status(404);
      return c.json({
        message: "The plan is not found",
      });
  }

  const transactionData = {
    userId,
    plan,
    credits,
    amount,
    date,
  };

  try {
    const newTransaction = await prisma.transaction.create({
      data: {
        userId: transactionData.userId,
        plan: transactionData.plan,
        credits: transactionData.credits,
        amount: transactionData.amount,
        date: transactionData.date,
      },
    });

    const options = {
      amount: amount * 100,
      currency: c.env.CURRENCY,
      receipt: newTransaction.id,
    };

    try {
      const paymentResp: any = await razorpayInstance.orders.create(options);
      c.status(200);
      return c.json({
        orderStatus: true,
        orders: paymentResp,
        message: "Payment Successfull",
      });
    } catch (err) {
      c.status(404);
      return c.json({
        orderStatus: false,
        message: `Some razorpay error : ${err}`,
      });
    }
  } catch (err) {
    c.status(500);
    return c.json({
      message: `Some internal server error : ${err}`,
    });
  }
});

// ednpoint to check the order by the order Id and increase the credit ammount for the user
userRoute.post("/updateCredits", userAuthCheck, async (c: Context) => {
  // instance for razorpay
  const razorpayInstance = new Razorpay({
    key_id: c.env.RAZORPAY_KEY_ID,
    key_secret: c.env.RAZORPAY_KEY_SECRET,
  });

  // init prisma
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const { razorpay_order_id } = await c.req.json();

  try {
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
    // if the payment is successfull
    if (orderInfo.status === "paid") {
      // find the transaction from the transaction table
      try {
        const transactionData = await prisma.transaction.findUnique({
          where: {
            id: orderInfo.receipt,
          },
          select: {
            userId: true,
            credits: true,
            plan: true,
            payment: true,
          },
        });
        if (transactionData?.payment) {
          c.status(404);
          return c.json({
            message: "Payment Failed -> old order ID",
          });
        }
        try {
          // update the payment in the transaction for the specific order id to be true
          await prisma.transaction.update({
            where: {
              id: orderInfo.receipt,
            },
            data: {
              payment: true,
            },
          });

          // update the user credits then
          const userData = await prisma.user.update({
            where: {
              id: transactionData?.userId,
            },
            data: {
              credits: {
                increment: transactionData?.credits,
              },
            },
          });
          c.status(200);
          return c.json({
            updatedCredits: userData.credits,
            message: "Credits Updated",
          });
        } catch (err) {
          c.status(500);
          return c.json({
            message: `Some prisma errorin updating the user credits : ${err}`,
          });
        }
      } catch (err) {
        c.status(500);
        return c.json({
          message: `Some prisma errorin updating the transactions : ${err}`,
        });
      }
    } else {
      c.status(400);
      return c.json({
        message: "Payment Failed",
      });
    }
  } catch (err) {
    c.status(500);
    return c.json({
      message: `Some internal server error : ${err}`,
    });
  }
});

export default userRoute;
