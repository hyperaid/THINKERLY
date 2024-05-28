import { Hono } from "hono";
import { decode, jwt, sign, verify } from "hono/jwt";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import  z from "zod";
import { signupInput, signinInput } from "@hyperraid/thinkerly";

 

export const userRouter=new Hono<{
    Bindings: {
        JWT_SECRET: string;
        DATABASE_URL: String;
      };
}>();




userRouter.post("/signup", async (c) => {
    // @ts-ignore
    console.log(c.env.DATABASE_URL);
    const prisma = new PrismaClient({
      //not initiating it global as it wont have access to hono or db url we can setup it in middleware thats a good option
      // @ts-ignore
  
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const {success}=signupInput.safeParse(body);
    if(!success){
      c.status(411);
      return c.json({
        message:"Inputs not correct"
      })
    }
    try {
      const user = await prisma.user.create({
        data: {
          email: body.email,
          password: body.password,
          name: body.name,
        },
      });
      // const secret:string="abhinav";
      const payload = {
        id: user.id,
        // exp:Math.floor
      };
      //@ts-ignore
      const token = await sign(payload, c.env.JWT_SECRET);
      return c.json({
        jwt: token,
      });
    } catch (e) {
      console.log(e)
      c.status(411);
      return c.text("invalid")
    }
  });
  userRouter.post("/signin", async (c) => {
    const prisma = new PrismaClient({
      // @ts-ignore
  
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const dataa = await c.req.json();
    const {success}=signinInput.safeParse(dataa);
    if(!success){
      c.status(411);
      return c.json({
        message:"Inputs not correct"
      })
    }
      
  
      try{
  
        const user = await prisma.user.findFirst({
          where: {
            email: dataa.email,
            password:dataa.password
          }
        })
      
        if (!user) {
          c.status(403);
          return c.json({
            error: "user not found",
          });
        }
        //@ts-ignore
        const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
      
        return c.text("verified");
      }catch(e){
        c.status(411);
      return c.text("invalid")
      }
  });