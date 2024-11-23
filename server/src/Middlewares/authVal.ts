import {
  SigninInputSchema,
  signinType,
  SignupInputSchema,
  signupType,
} from "@deba018/blogs-common";
import { Context, Next } from "hono";

export const signupAuth = async (c: Context, next: Next) => {
  const body: signupType = await c.req.json();

  // checking the zod validation type
  const checked = SignupInputSchema.safeParse(body);
  if (checked.success) await next();
  else {
    c.status(404);
    return c.json({
      feedback: "The input is not correct",
      message: checked.error?.errors.map((e) => e.message),
    });
  }
};

export const signinAuth = async (c: Context, next: Next) => {
  const body: signinType = await c.req.json();

  const checked = SigninInputSchema.safeParse(body);
  if (checked.success) await next();
  else {
    c.status(404);
    return c.json({
      feedback: "The input is not correct",
      message: checked.error?.errors.map((e) => e.message),
    });
  }
};
