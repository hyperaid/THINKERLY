import { Hono } from "hono";
import { decode, jwt, sign, verify } from "hono/jwt";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createBlogInput, updateBlogInput  } from "@hyperraid/thinkerly";
export const blogRouter = new Hono<{
  Bindings: {
    JWT_SECRET: string;
    DATABASE_URL: String;
  },
  Variables:{
    userId:string,
  }

}>();

blogRouter.use("/*", async (c, next) => {
  try{
    const authHeader= c.req.header("authorization") || " ";//as it will define it as a string    i added here 
  console.log("kya dikat hai")
  console.log(authHeader)
  const user=await verify(authHeader,c.env.JWT_SECRET) 
  // console.log(user)
  if(user){
    c.set("userId",user.id as string);
    await next();
  }
  else {
    c.status(403)
    return c.json({
       message:"you are not logged in"
    });

  }
  await next();
  }
  catch(e){
    c.status(403)
    return c.json({
      message:"you are not logged in "
    })
  }
  // next();
});

blogRouter.post("/", async (c) => {
  const prisma = new PrismaClient({
     // @ts-ignore

    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const {success}= createBlogInput.safeParse(body);
  if(!success){
    c.status(411);
    return c.json({
      message:"Inputs not correct"
    })
  }
  const authorId=c.get("userId")
  const blog = await prisma.blog.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: Number(authorId)
      
    },
  });

  return c.json({ id: blog.id });
});
blogRouter.put("/", async (c) => {
  const prisma = new PrismaClient({
     // @ts-ignore

    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const {success}= updateBlogInput.safeParse(body);
  if(!success){
    c.status(411);
    return c.json({
      message:"Inputs not correct"
    })
  }
  console.log(body)
  const blog = await prisma.blog.update({
    data: {
      title: body.title,
      content: body.content,
    },
    where: {
      id: body.id,
    },
  });
  console.log("hii")

  return c.text("dasnk");
});
 
blogRouter.get("/bulk",async (c)=>{
  const prisma = new PrismaClient({
    //not initiating it global as it wont have access to hono or db url 
    // @ts-ignore

    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  console.log("hello")
  // const body = await c.req.json();
  // console.log(body);

  try{
    const blogs=await prisma.blog.findMany({
      select:{
        id:true,
        title:true,
        content:true,
        author:{
          select:{
            name:true
          } 
        }
        
      },
      
    });
    console.log(blogs)
    return c.json({
      blogs
    })
  }catch(e){
      return c.json({"message":"login please"})
      
  }
})
blogRouter.get("/:id", async (c) => {
  try {
    const prisma = new PrismaClient({
    
      // @ts-ignore

      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const params = c.req.param("id");
    const blog = await prisma.blog.findFirst({
      where: {
        id: Number(params),
      }, 
      select:{
        
        title:true,
        content:true,
        author:{
          select:{
            name:true
          }
        }
      }
    });
    return c.json({
      blog
    })
  } catch (e) {
    c.status(411);
    return c.json({
      message:"error while fetching "
    })
  }
});

