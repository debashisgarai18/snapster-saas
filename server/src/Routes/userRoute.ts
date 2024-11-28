import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Context, Hono } from "hono";
import { signupAuth } from "../Middlewares/authVal";
import { signinType, signupType } from "@deba018/blogs-common";
import { sign } from "hono/jwt";
import { userAuthCheck } from "../Middlewares/authCheck";
import axios from "axios";
import FormData from "form-data";

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
      select : {
        name : true,
        email : true,
        credits : true
      }
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

// todo : endpoint to generate the image 
userRoute.post("/genImage", userAuthCheck, async (c : Context) => {
  const api = c.env.CLIP_DROP_API_KEY;
  const userId = c.get("user");
  const {prompt} = await c.req.json()
  try{
    const resp = await axios.post("https://clipdrop-api.co/text-to-image/v1")
    const formData = new FormData();
    formData.append('prompt', prompt)
    console.log(formData) 
  }
  catch(err){
    c.status(500)
    return c.json({
      message : `Some internal server error : ${err}`
    })
  }
})

export default userRoute;
