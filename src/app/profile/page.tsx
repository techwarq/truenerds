import { redirect } from 'next/navigation';
import { authOptions, getAuthSession } from '@/lib/auth';
import UserActivities from '@/components/UserActivities';
import { db } from '@/lib/db';

import Link from 'next/link'
import { User } from 'next-auth'
import { UserAvatar } from '../../components/UserAvatar'

interface ProfileProps {
  params: { username: string }
}

export default async function ProfilePage({ params: { username } }: ProfileProps) {
  const session = await getAuthSession()

  if (!session?.user) {
    redirect(authOptions?.pages?.signIn || '/login')
  }

  const user = await db.user.findFirst({
    where: { username },
  })

  if (!user) {
    // Handle the case where the user is not found
    return <div>User not found</div>
  }

  return (
    <div className='flex w-full flex-col justify-start'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <div className='relative'>
            <UserAvatar
              user={{ name: user.name || null, image: user.image || null }}
              className='h-8 w-8'
            />
          </div>
          <div className='flex-1'>
            <h2 className='text-left text-heading3-bold text-light-1'>
              {user.name}
            </h2>
            <p className='text-base-medium text-gray-1'>{user.username}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
