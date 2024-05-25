import { Hono } from 'hono'

const app = new Hono().basePath("/api/v1")

app.post("/signup", (c) => {
  return c.text("a");
});
app.post("/signin",(c) =>{
  return c.text("dasnk");
})
app.post("/blog",(c) =>{
  return c.text("dasnk");
})
app.put("/blog",(c) =>{
  return c.text("dasnk");
})
app.get("/blog/:id",(c) =>{
  return c.text("dasnk");
})




export default app
