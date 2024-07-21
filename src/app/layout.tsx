import Bottombar from '@/components/Bottombar'
import LeftSidebar from '@/components/LeftSidebar'
import Navbar from '@/components/Navbar'
import Providers from '@/components/Providers'
import { Toaster } from '@/components/ui/toaster'
import { cn } from '@/lib/utils'
import '@/styles/globals.css'
import { Analytics } from "@vercel/analytics/react"

import {Inter, Roboto_Mono} from "next/font/google"
export const metadata = {
  title: 'truenerds',
  description: 'A social Media App for nerds',
}
const inter = Inter({subsets:['latin'] })
const robotoMono = Roboto_Mono({ subsets: ['latin'], weight: ['400', '500', '700'] });
export default function RootLayout({
  children,

}: {
  children: React.ReactNode
  
}) {
  return (
    <html lang='en' className={cn(' text-slate-900 antialiased', robotoMono.className)}>
      <body className='min-h-screen pt-2 bg-stone-900 antialiased'>
        <Providers>
        <Navbar />
        
        <main className='flex flex-row'>
            <LeftSidebar />
        <section className='main-container'>
        <div className='  max-w-screen mx-auto h-full pt-12 '>  {children}

        </div>
        </section>
        </main>

        <Bottombar />
      
        <Toaster />
        <Analytics />
       

        </Providers>

        </body>
       
    </html>
  )
}
