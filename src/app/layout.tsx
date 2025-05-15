import type { Metadata } from 'next'
import '@/styles/globals.css'

import { LanguageProvider } from '@/context/language-content'
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: `Giordano's Portfolio`,	
  description: 'A detailed portfolio website showcasing my work, projects and skills.'
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) 
{
  return (
    <html lang="en" suppressHydrationWarning>
      <body className='font-sans'>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
