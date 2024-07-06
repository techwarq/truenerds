import type { Post, Subnerds, User, Vote, Comment, Subnerds } from '@prisma/client'

export type ExtendedPost = Post & {
  subnerds: Subnerds
  votes: Vote[]
  author: User
  comments: Comment[]
}