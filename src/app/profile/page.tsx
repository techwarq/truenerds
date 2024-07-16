
import { redirect } from 'next/navigation';
import { authOptions, getAuthSession } from '@/lib/auth';
import UserActivities from '@/components/UserActivities';
import { db } from '@/lib/db';



import Link from 'next/link'
import { User } from 'next-auth'
import { UserAvatar } from '../../components/UserAvatar'

interface ProfileProps extends React.HTMLAttributes<HTMLDivElement> {
    user: Pick<User, 'name' | 'image' | 'email'>
    params: {username: string}
  }


export default async function ProfilePage({params: {username}}: ProfileProps) {
    const session = await getAuthSession()

    if (!session?.user) {
        redirect(authOptions?.pages?.signIn || '/login')
      }
    

    const User = await db.user.findFirst({
        where : {username},
        
    })
 


    

  

    return (
      <div className='flex w-full flex-col justify-start'>
        <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
                <div className='relative '>
              
                </div>
                <div className='flex-1'>
            <h2 className='text-left text-heading3-bold text-light-1'>
              
            </h2>
            <p className='text-base-medium text-gray-1'>{User?.username}</p>
          </div>
            </div>
        </div>
      </div>
    );
  
}