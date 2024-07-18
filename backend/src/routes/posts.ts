import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { createBlogInput, updateBlogInput } from '@sudhanshugau12/blog-common'

export const postRouter = new Hono<{
    // typescript doesn't know the anthing about wrangler env so we have to explicitly define its type
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string,
    },
    Variables: {
        userId: string,
    }
}>()

postRouter.use("/*", async (c, next) => {
    const authHeader = c.req.header("authorization") || "";
    // const token = authHeader.split(' ')[1]; // Extract the token

    try {
        const user = await verify(authHeader, c.env.JWT_SECRET); // Verify the token
        if (user) {
            //@ts-ignore
            c.set('userId', user.id);
            await next(); // Call next only once
        } else {
            c.status(403);
            return c.json({
                message: "Failed to authenticate user!",
            });
        }

    } catch (error) {
        console.log("Middleware error: ", error);
        c.status(403);
        return c.json({
            message: "You are not logged in",
        });
    }
});

postRouter.post('/', async (c) => {
    // Client
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    // Main code - upload new post
    const body = await c.req.json();
    const { success } = createBlogInput.safeParse(body);
    if(!success) {
        c.status(411);
        return c.json({
            message: "Inputs not correct"
        })
    }

    const userId = c.get('userId');
    const blog = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: Number(userId),  // hardcoded, will change later
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

    // Main code - update post by post id
    const body = await c.req.json();
    const { success } = updateBlogInput.safeParse(body);
    if(!success) {
        c.status(411);
        return c.json({
            message: "Inputs not correct"
        })
    }

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

// puting bulk above so that it become the first one to get called, as bulk can also act as an id
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

postRouter.get('/:id', async (c) => {
    // Client
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    // Main code - get post by post id
    const id = c.req.param("id");
    try {
        const blog = await prisma.post.findFirst({
            where: {
                id: Number(id),
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


