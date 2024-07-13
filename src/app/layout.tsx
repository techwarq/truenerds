import Bottombar from '@/components/Bottombar'
import Navbar from '@/components/Navbar'
import Providers from '@/components/Providers'
import { Toaster } from '@/components/ui/toaster'
import { cn } from '@/lib/utils'
import '@/styles/globals.css'
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
      <body className='min-h-screen pt-2 bg-black antialiased'>
        <Providers>
        <Navbar />
        
        <div className=' container max-w-screen mx-auto h-full pt-12 '>  {children}

        </div>
      
        <Toaster />
       

        </Providers>

        </body>
       
    </html>
  )
}
