import { redirect } from 'next/navigation';
import { getAuthSession } from '@/lib/auth';
import UserActivities from '@/components/UserActivities';
import { db } from '@/lib/db';
import { User, Subnerds } from '@prisma/client';

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function ProfilePage({ params }: PageProps) {
  const { slug } = params;

  try {
    const session = await getAuthSession();

    if (!session?.user) {
      redirect('/login');
    }

    // Fetch user details
    const user = await db.user.findUnique({
      where: {
        id: session.user.id,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    // Fetch subnerds data based on slug
    const subnerds = await db.subnerds.findUnique({
      where: {
        name: slug,
      },
    });

    if (!subnerds) {
      return (
        <div className='max-w-4xl mx-auto py-12'>
          <p>Subnerds not found.</p>
        </div>
      );
    }

    return (
      <div className='max-w-4xl mx-auto py-12'>
        <div className='grid items-start gap-8'>
          <h1 className='font-bold text-3xl text-green-600 md:text-4xl'>Settings</h1>
          <div className='grid gap-10'>
            <UserActivities user={user as User & { username: string }} subnerds={subnerds as Subnerds & { name: string }} />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching data:', error);
    return (
      <div className='max-w-4xl mx-auto py-12'>
        <p>Error fetching data. Please try again later.</p>
      </div>
    );
  }
}