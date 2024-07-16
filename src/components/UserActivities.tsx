'use client'

import { getAuthSession } from "@/lib/auth"
import {User as UserType, Subnerds as SubnerdsType} from "@prisma/client"


interface UserActivitiesProps{
    user: UserType & {
        username: string,
        

    }
    subnerds: SubnerdsType & {
        name: string,
    }
}


const UserActivities =  ({user, subnerds}: UserActivitiesProps) => {

  

    return(
        <div className='overflow-hidden h-fit rounded-lg border border-green-200 order-first md:order-last'>
      <div className='text-2xl text-green-600'>Joined Communities</div>
      <div className='px-6 py-4'>
        <h1 className='text-xl'>u/{user.username}</h1>
        <p className='font-semibold py-3 text-green-600'>n/{subnerds.name}</p>
      </div>
    </div>
    )

}













export default UserActivities;