import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { userRouter } from './routes/user'
import { postRouter } from './routes/posts'


const app = new Hono<{
  // typescript doesn't know the anthing about wrangler env so we have to explicitly define its type
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string,
  }
}>()

app.route("/api/v1/user", userRouter);
app.route("/api/v1/post", postRouter);


export default app

// postgresql://prisma-todo_owner:eIV1nTq9fdsg@ep-late-snow-a53gbvqv.us-east-2.aws.neon.tech/prisma-todo?sslmode=require


// DATABASE_URL="prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiNTUxOGEyNWYtNGRlYS00NGExLWEwNzMtZTZiOWM1ZDcxNzM4IiwidGVuYW50X2lkIjoiMWViZjdlODU3MzgxZjRhOWU1ZmNjMjY4NmUzMTQ4N2QzYjMzODAzNjgzNDhlZDEwZjM1MTEwYTFhNTU0NTAyZSIsImludGVybmFsX3NlY3JldCI6ImRlMjM1NTdkLTI5YzItNGYxZS1hYTdiLTNhYjI4Nzc2OTRmNCJ9.X7asLm8c_merdJHty0hJi4tLaUIZWva9SIquN5aHdMk"