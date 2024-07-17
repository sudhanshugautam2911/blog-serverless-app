import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'

export const postRouter = new Hono<{
    // typescript doesn't know the anthing about wrangler env so we have to explicitly define its type
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string,
    }
}>()

postRouter.use("/*", (c, next) => {
    // extract user id
    // pass it down to the routes
    next();
})

postRouter.post('/', async (c) => {
    // Client
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    // Main code
    const body = await c.req.json();

    const blog = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: 1,  // hardcoded, will change later
        }
    })
    return c.json({
        id: blog.id
    })

})

postRouter.put('/', async (c) => {
    // Client
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    // Main code
    const body = await c.req.json();

    const blog = await prisma.post.update({
        where: {
            id: body.id,
        },
        data: {
            title: body.title,
            content: body.content,
        }
    })
    return c.json({
        id: blog.id
    })
})

postRouter.get('/', async (c) => {
    // Client
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    // Main code
    const body = await c.req.json();
    try {
        const blog = await prisma.post.findFirst({
            where: {
                id: body.id,
            }
        })
        return c.json({
            blog
        })
    } catch (error) {
        c.status(411); 
        return c.json({
            message: "Error while fetching blog post"
        })
    }
})

// remaining pagination , dont send all at first, just send 10 at first
postRouter.get('/bulk', async (c) => {
    // Client
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    // Main code

    const blogs = await prisma.post.findMany({})
    return c.json({
        blogs
    })
})
