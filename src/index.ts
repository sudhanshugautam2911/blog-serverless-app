import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

const app = new Hono()


app.post('/api/v1/user/signup', (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  return c.text('Hello World!')
})

app.post('/api/v1/user/signin', (c) => {
  return c.text('Hello World!')
})

app.post('/api/v1/blog', (c) => {
  return c.text('Hello World!')
})

app.put('/api/v1/blog', (c) => {
  return c.text('Hello World!')
})

app.get('/api/v1/blog', (c) => {
  return c.text('Hello World!')
})

app.get('/api/v1/blog/bulk', (c) => {
  return c.text('Hello World!')
})

export default app

// postgresql://prisma-todo_owner:eIV1nTq9fdsg@ep-late-snow-a53gbvqv.us-east-2.aws.neon.tech/prisma-todo?sslmode=require


// DATABASE_URL="prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiNTUxOGEyNWYtNGRlYS00NGExLWEwNzMtZTZiOWM1ZDcxNzM4IiwidGVuYW50X2lkIjoiMWViZjdlODU3MzgxZjRhOWU1ZmNjMjY4NmUzMTQ4N2QzYjMzODAzNjgzNDhlZDEwZjM1MTEwYTFhNTU0NTAyZSIsImludGVybmFsX3NlY3JldCI6ImRlMjM1NTdkLTI5YzItNGYxZS1hYTdiLTNhYjI4Nzc2OTRmNCJ9.X7asLm8c_merdJHty0hJi4tLaUIZWva9SIquN5aHdMk"