import { Context, Next } from "hono";
import { verify } from "hono/jwt";

export const userAuthCheck = async (c: Context, next: Next) => {
  const token = c.req.header("authorization");
  if (!token) {
    c.status(404);
    return c.json({
      message: "No auth hader provided",
    });
  }

  const splitToken = token.split(" ")[1];
  if (!splitToken) {
    c.status(400);
    return c.json({
      message: "No token provided",
    });
  }

  const decode = await verify(splitToken, c.env.JWT_SECRET);
  if (decode) {
    c.set("user", decode.id);
    await next();
  } else {
    c.status(403);
    return c.json({
      message: "User not Authenticated",
    });
  }
};
