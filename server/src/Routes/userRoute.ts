import { Context, Hono } from "hono";

const userRoute = new Hono();

userRoute.get("/", (c: Context) => {
  return c.json({
    message: "gotcha",
  });
});

export default userRoute;
