import { Hono } from 'hono'
import { decode, jwt, sign, verify } from 'hono/jwt'
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

const app=new Hono<{
  Bindings:{
    JWT_SECRET:string,
    DATABASE_URL:String
  }
}>;

app.use("/api/v1/blog/*",async (c,next)=>{
  const data=  c.req.header('Authorization');
  const token= data?.split(',')[1];
  if(!token){
    return c.json({
      "error":"unautorized user "
    })
  }
  const payload=await verify(token,c.env.JWT_SECRET);
  if(!payload){
    return c.json({
      message:"Unautorized user"
    })
  }
  c.set('jwtPayload',payload.id);
  await next();

})
app.post("/api/v1/signup", async (c) => {
  // @ts-ignore
  console.log(c.env.DATABASE_URL);
    const prisma=new PrismaClient({
  // @ts-ignore

      datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate())
    const body=await c.req.json();
    const user=await prisma.user.create({
      data:{
        email:body.email,
        password:body.password,
        name:body.name,        

      },
    });
      // const secret:string="abhinav";
      const payload={ 
        id:user.id,
        // exp:Math.floor
      }
      //@ts-ignore
      const token=await sign(payload,c.env.JWT_SECRET);
      return c.json({
        jwt:token
      })




});
app.post("/api/v1/signin",async (c) =>{
  const prisma=new PrismaClient({
    // @ts-ignore
  
        datasourceUrl:c.env.DATABASE_URL
      }).$extends(withAccelerate())
      const dataa=await  c.req.json();
      const user=await prisma.user.findUnique({
        where:{
          email:dataa.email,
            
        }

      })

      if(!user){
        c.status(403)
        return c.json({
          error:"user not found"
        })
      }
      //@ts-ignore
      const jwt=await sign({id:user.id},c.env.JWT_SECRET)


  return c.text("dasnk");
})
app.post("/api/v1/blog",(c) =>{
  return c.text("dasnk");
})
app.put("/api/v1/blog",(c) =>{
  return c.text("dasnk");
})
app.get("/api/v1/blog/:id",(c) =>{
  return c.text("dasnk");
})




export default app
