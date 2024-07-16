import { redirect } from 'next/navigation';
import { authOptions, getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { UserAvatar } from '@/components/UserAvatar';
import { INFINITE_SCROLL_PAGINATION_RESULTS } from '@/config';
import Post from '@/components/Post';

interface ProfileProps {
  params: { username: string }
}

export default async function ProfilePage({ params: { username } }: ProfileProps) {
  const session = await getAuthSession();

  if (!session?.user) {
    redirect(authOptions?.pages?.signIn || '/login');
  }

  const user = await db.user.findFirst({
    where: { id: session.user.id },
    include: {
      posts: {
        include: {
          author: true,
          votes: true,
          comments: true,
          subnerds: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: INFINITE_SCROLL_PAGINATION_RESULTS,
      },
    },
  });

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className='flex w-full text-green-600 flex-col justify-start'>
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

      <div className='mt-4'>
        <h3 className='text-heading3-bold text-light-1'>Posts</h3>
        {user.posts.length ? (
          <ul className='mt-4'>
            {user.posts.map((post) => (
              <li key={post.id} className='mb-4'>
                <Post
                  post={post}
                  votesAmt={post.votes.length}
                  subredditName={post.subnerds.name}
                  commentAmt={post.comments.length}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p className='text-base-medium text-gray-1'>No posts found.</p>
        )}
      </div>
    </div>
  );
}
