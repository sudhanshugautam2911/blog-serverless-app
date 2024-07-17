import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'

export const userRouter = new Hono<{
    // typescript doesn't know the anthing about wrangler env so we have to explicitly define its type
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string,
    }
}>()


userRouter.post('/signup', async (c) => {
    // Client
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    // main code
    const body = await c.req.json();
    // zod , password hash
    try {
        const user = await prisma.user.create({
            data: {
                username: body.username,
                password: body.password,
                name: body.name
            }
        })
        const jwt = await sign({
            id: user.id,
        }, c.env.JWT_SECRET);

        return c.text(jwt)

    } catch (error) {
        console.log(error);

        c.status(411);
        return c.text('User can not be created');
    }

})

userRouter.post('/signin', async (c) => {
    // Client
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    // main code
    const body = await c.req.json();
    try {
        const user = await prisma.user.findFirst({
            where: {
                username: body.username,
                password: body.password
            }
        })
        if (!user) {
            c.status(403);  // unauthorized
            return c.json({
                message: "Incorrect creds!"
            })
        }
        const jwt = await sign({
            id: user.id,
        }, c.env.JWT_SECRET);

        return c.text(jwt)

    } catch (error) {
        console.log(error);

        c.status(411);
        return c.text('User can not be logged In');
    }
})