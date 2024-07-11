import Navbar from '@/components/Navbar'
import Providers from '@/components/Providers'
import { Toaster } from '@/components/ui/toaster'
import { cn } from '@/lib/utils'
import '@/styles/globals.css'
import {Inter} from "next/font/google"
export const metadata = {
  title: 'Breadit',
  description: 'A Reddit clone built with Next.js and TypeScript.',
}
const inter = Inter({subsets:['latin'] })
export default function RootLayout({
  children,

}: {
  children: React.ReactNode
  
}) {
  return (
    <html lang='en' className={cn(' text-slate-900 antialiased', inter.className)}>
      <body className='min-h-screen pt-2 bg-slate-50 antialiased'>
        <Providers>
        <Navbar />
        
        <div className=' container max-w-screen mx-auto h-full pt-12 bg-slate-400'>  {children}

        </div>
      
        <Toaster />

        </Providers>

        </body>
       
    </html>
  )
}
