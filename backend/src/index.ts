import { Hono } from "hono";
import { decode, jwt, sign, verify } from "hono/jwt";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { userRouter } from "./routes/user";
import { blogRouter } from "./routes/blogs";
import { cors } from 'hono/cors'
const app = new Hono<{
  Bindings: {
    JWT_SECRET: string;
    DATABASE_URL: String;
  };
}>();
app.use('/api/*', cors())
 

// app.use("/api/v1/blog/*", async (c, next) => {
//   const data = c.req.header("Authorization");
//   const token = data?.split(",")[1];
//   if (!token) {
//     return c.json({
//       error: "unautorized user ",
//     });
//   }
//   const payload = await verify(token, c.env.JWT_SECRET);
//   if (!payload) {
//     return c.json({
//       message: "Unautorized user",
//     });
//   }
//   c.set("jwtPayload", payload.id);
//   await next();
// });

app.route("/api/v1/user",userRouter);
app.route("/api/v1/blog",blogRouter);

export default app;
