import CustomFeed from "@/components/homepage/CustomFeed";
import GeneralFeed from "@/components/homepage/GeneralFeed";
import { buttonVariants } from "@/components/ui/Button";
import { HomeIcon } from "lucide-react";
import Link from "next/link";
import { getAuthSession } from '@/lib/auth'

export default async function Home() {
  const session = await getAuthSession()
  return(
    <>
    <h1 className='font-bold text-3xl text-green-500 md:text-4xl mt-5'>Your feed</h1>
    <a
                  className='underline text-green-600 text-sm underline-offset-2'
                  href={`/n/science`}>
                  Join the test group n/science
                </a>
                
      <div className='grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6 '>
       
        

      {session ? <CustomFeed /> : <GeneralFeed />}
        <div className='overflow-hidden h-fit  rounded-lg border border-gray-200 order-first md:order-last'>
          <div className=' bg-green-500 px-6 py-4'>
            <p className='font-semibold py-3 flex items-center gap-1.5'>
              <HomeIcon className='h-4 w-4' />
              Home
            </p>
          </div>
          <dl className='-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6'>
            <div className='flex justify-between gap-x-4 py-3'>
              <p className='text-white'>
                Your personal truenerds frontpage. Come here to check in with your
                favorite communities.
              </p>
            </div>

            <Link
              className={buttonVariants({
                className: 'w-full mt-4 mb-6',
              })}
              href={`/n/create`}>
              Create Community
            </Link>
            <Link
              className={buttonVariants({
                className: 'w-full mt-2 mb-6 ',
              })}
              href={`https://shorturl.at/cWztC`}>
              Subscribe to Newsletter
            </Link>
            

            
          </dl>
        </div>
      </div>
           
    </>
  )
}
