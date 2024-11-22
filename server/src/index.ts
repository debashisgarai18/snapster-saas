import { Hono } from "hono";
import userRoute from "./Routes/userRoute";

const app = new Hono().basePath("/api/v1/");

// todo : add the cors middleware
// dynamic routes
app.route("/user", userRoute);

export default app;
