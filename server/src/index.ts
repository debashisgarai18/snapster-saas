import { Hono } from "hono";
import userRoute from "./Routes/userRoute";
import { cors } from "hono/cors";


const app = new Hono().basePath("/api/v1/");

app.use("/*", cors())
// dynamic routes
app.route("/user", userRoute);

export default app;
