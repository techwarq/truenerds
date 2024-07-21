import { redirect } from 'next/navigation';
import { authOptions, getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { UserAvatar } from '@/components/UserAvatar';
import { INFINITE_SCROLL_PAGINATION_RESULTS } from '@/config';
import Post from '@/components/Post';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { profileTabs } from "@/contants";
import Image from 'next/image';

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
      <div className='mt-9'>
        <Tabs defaultValue='posts' className='w-full'>
            <TabsList className='tab'>
                {profileTabs.map((tab) =>(
                    <TabsTrigger key={tab.label} value={tab.value} className='tab'>
                        <Image src={tab.icon} alt={tab.label}
                        width={24}
                        height={24}
                        className='object-contain'/>

                        <p className='max-sm:hidden'>{tab.label}</p>
                        {tab.label === 'Posts' &&(
                            <p className='ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-green-600'>{user.posts.length }</p>
                        )}

                    </TabsTrigger>
                ))}

            </TabsList>
        </Tabs>
      </div>

      <div className='mt-4 w-full'>
        <h3 className='text-heading3-bold text-light-1'>Posts</h3>
        {user.posts.length ? (
          <ul className='mt-4 space-y-4 w-full'>
            {user.posts.map((post) => (
              <li key={post.id} className='w-full'>
                <div className='w-full lg:max-w-[550px] mx-auto'>
                  <Post
                    post={post}
                    votesAmt={post.votes.length}
                    subredditName={post.subnerds.name}
                    commentAmt={post.comments.length}
                  />
                </div>
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
