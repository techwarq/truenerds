import { redirect } from 'next/navigation'

import { UserNameForm } from '@/components/UserNameForm'
import { authOptions, getAuthSession } from '@/lib/auth'
import UserActivities from '@/components/UserActivities'



export default async function SettingsPage() {
    const session = await getAuthSession()

  if (!session?.user) {
    redirect(authOptions?.pages?.signIn || '/login')
  }

  // Assuming 'slug' can be derived from the session or passed in another way
  const slug = 'some-slug' // Replace this with actual logic to get the slug

  return (
    <div className='max-w-4xl mx-auto py-12'>
      <div className='grid items-start gap-8'>
        <h1 className='font-bold text-3xl text-green-600 md:text-4xl'>Settings</h1>
        <div className='grid gap-10'>
          <UserActivities username={session.user?.username} slug={slug} />
        </div>
      </div>
    </div>
  )
}