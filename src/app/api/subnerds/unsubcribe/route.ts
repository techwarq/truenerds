import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { SubnerdsSubscriptionValidator } from '@/lib/validators/subnerds'
import { z } from 'zod'

export async function POST(req: Request) {
  try {
    const session = await getAuthSession()

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 })
    }

    const body = await req.json()
    const { subnerdsId } = SubnerdsSubscriptionValidator.parse(body)

    // check if user has already subscribed or not
    const subscriptionExists = await db.subscription.findFirst({
      where: {
        subnerdsId,
        userId: session.user.id,
      },
    })

    if (!subscriptionExists) {
      return new Response(
        "You've not been subscribed to this subreddit, yet.",
        {
          status: 400,
        }
      )
    }

    // create subreddit and associate it with the user
    await db.subscription.deleteMany({
        where: {
          AND: [
            { userId: session.user.id },
            { subnerdsId },
          ],
        },
      })

    return new Response(subnerdsId)
  } catch (error) {
    (error)
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 })
    }

    return new Response(
      'Could not unsubscribe from subreddit at this time. Please try later',
      { status: 500 }
    )
  }
}