import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { CommentVoteValidator } from '@/lib/validators/vote'
import { z } from 'zod'

export async function PATCH(req: Request) {
  try {
    const body = await req.json()
    const { commentId, voteType } = CommentVoteValidator.parse(body)
    const session = await getAuthSession()

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 })
    }

    // Check if user has already voted on this comment
    const existingVote = await db.commentVote.findFirst({
      where: {
        userId: session.user.id,
        commentId,
      },
    })

    if (existingVote) {
      if (existingVote.type === voteType) {
        // Delete the vote if it is the same as the existing one
        await db.commentVote.delete({
          where: {
            id: existingVote.id,
          },
        })
        return new Response('OK')
      } else {
        // Update the vote if it is different
        await db.commentVote.update({
          where: {
            id: existingVote.id,
          },
          data: {
            type: voteType,
          },
        })
        return new Response('OK')
      }
    }

    // If no existing vote, create a new vote
    await db.commentVote.create({
      data: {
        type: voteType,
        userId: session.user.id,
        commentId,
      },
    })

    return new Response('OK')
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 })
    }

    return new Response(
      'Could not post to subreddit at this time. Please try later',
      { status: 500 }
    )
  }
}
