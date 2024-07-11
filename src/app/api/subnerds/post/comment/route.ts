import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { CommentValidator } from '@/lib/validators/comment'
import { z } from 'zod'

export async function PATCH(req: Request) {
  try {
    const body = await req.json()

    const { postId, text, replyToId } = CommentValidator.parse(body)

    const session = await getAuthSession()

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 })
    }

    await db.comment.create({
      data: {
        text,
        postId,
        authorId: session.user.id,
        replyToId,
      },
    })

    return new Response('Comment created successfully', { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(`Validation error: ${error.message}`, { status: 400 })
    }

    console.error('Error creating comment:', error)
    return new Response(
      'Could not create comment at this time. Please try again later.',
      { status: 500 }
    )
  }
}
