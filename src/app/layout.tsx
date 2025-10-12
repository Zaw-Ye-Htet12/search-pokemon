import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ApolloWrapper as ApolloProvider } from '../providers/ApolloProvider';
import { ThemeProvider } from '../providers/ThemeProvider';
import Navbar from '@/components/common/Navbar';
import { Toaster } from '@/components/ui/sonner';
import { Suspense } from 'react';

const geistSans = Geist({
   variable: '--font-geist-sans',
   subsets: ['latin'],
});

const geistMono = Geist_Mono({
   variable: '--font-geist-mono',
   subsets: ['latin'],
});

export const metadata: Metadata = {
   title: 'PokéSearch',
   description: 'Search for your favorite Pokémon and explore their details!',
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en" suppressHydrationWarning>
         <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
               <ApolloProvider>
                  <Suspense>
                     <Navbar />
                     <main className="max-w-6xl mx-auto px-4 w-full">{children}</main>
                     <Toaster position="top-right" richColors />
                  </Suspense>
               </ApolloProvider>
            </ThemeProvider>
         </body>
      </html>
   );
}
