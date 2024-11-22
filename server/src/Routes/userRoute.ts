import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Context, Hono } from "hono";

const userRoute = new Hono();

userRoute.post("/signup", async (c: Context) => {
  const { body } = await c.req.json();

  // init the prisma
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const resp = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: body.password,
      },
    });
  } catch (err) {
    c.status(500);
    return c.json({
      message: "Internal Server Error",
    });
  }
});

export default userRoute;
