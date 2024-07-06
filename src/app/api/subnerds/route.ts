import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { SubnerdsValidator } from '@/lib/validators/subnerds'
import { z } from 'zod'

export async function POST(req: Request) {
  try {
    const session = await getAuthSession()

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 })
    }

    const body = await req.json()
    const { name } = SubnerdsValidator.parse(body)

    // check if subreddit already exists
    const subnerdsExists = await db.subnerds.findFirst({
      where: {
        name,
      },
    })

    if (subnerdsExists) {
      return new Response('Subreddit already exists', { status: 409 })
    }

    // create subreddit and associate it with the user
    const subnerds = await db.subnerds.create({
      data: {
        name,
        creatorId: session.user.id,
      },
    })

    // creator also has to be subscribed
    await db.subscription.create({
      data: {
        userId: session.user.id,
        subnerdsId: subnerds.id,
      },
    })

    return new Response(subnerds.name)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 })
    }

    return new Response('Could not create subreddit', { status: 500 })
  }
}