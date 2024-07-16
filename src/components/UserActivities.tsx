import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { notFound } from 'next/navigation'
import React from 'react'
import { User } from '@prisma/client'

interface UserProps {
  username: string | null | undefined
  slug: string
}

const UserActivities = async ({ username, slug }: UserProps) => {
  const session = await getAuthSession()

  const subreddit = await db.subnerds.findFirst({
    where: { name: slug },
    include: {
      posts: {
        include: {
          author: true,
          votes: true,
        },
      },
    },
  })
  if (!subreddit) return notFound()

  const subscription = !session?.user
    ? undefined
    : await db.subscription.findFirst({
        where: {
          subnerds: {
            name: slug,
          },
          user: {
            id: session.user.id,
          },
        },
      })

  const isSubscribed = !!subscription

  const memberCount = await db.subscription.count({
    where: {
      subnerds: {
        name: slug,
      },
    },
  })

  return (
    <div className='overflow-hidden h-fit rounded-lg border border-green-200 order-first md:order-last'>
      <div className='text-2xl text-green-600'>Joined Communities</div>
      <div className='px-6 py-4'>
        <h1 className='text-xl'>u/{username}</h1>
        <p className='font-semibold py-3 text-green-600'>n/{subreddit.name}</p>
      </div>
    </div>
  )
}

export default UserActivities
