// src/app/global-error.tsx
'use client';

import { Button } from '@/components/ui/button';
import { RefreshCw, Home, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { Routes } from '@/config/routes';
import { useEffect } from 'react';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
   useEffect(() => {
      // Log the error to an error reporting service
      console.error('Global error caught:', error);
   }, [error]);

   return (
      <html>
         <body className="min-h-screen bg-gradient-to-br from-background via-blue-50/20 to-purple-50/10 dark:from-background dark:via-blue-950/10 dark:to-purple-950/5">
            <div className="flex min-h-screen flex-col items-center justify-center p-8">
               <div className="w-full max-w-md mx-auto text-center">
                  {/* Animated Error Icon */}
                  <div className="relative mb-8">
                     <div className="w-32 h-32 mx-auto bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg shadow-red-500/25 animate-pulse">
                        <AlertTriangle className="w-16 h-16 text-white" />
                     </div>

                     {/* Floating particles */}
                     <div className="absolute -top-2 -left-2 w-6 h-6 bg-yellow-400 rounded-full animate-bounce" />
                     <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-blue-400 rounded-full animate-bounce delay-150" />
                     <div className="absolute top-4 -right-4 w-3 h-3 bg-green-400 rounded-full animate-bounce delay-300" />
                  </div>

                  {/* Error Content */}
                  <div className="space-y-6">
                     <div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-4">
                           Oops! Something went wrong
                        </h1>
                        <p className="text-muted-foreground text-lg mb-2">The app encountered an unexpected error</p>
                        <p className="text-sm text-muted-foreground/80 max-w-sm mx-auto">
                           Don&#39;t worry, our team has been notified. You can try refreshing the page or go back home.
                        </p>
                     </div>

                     {/* Action Buttons */}
                     <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                        <Link href={Routes.HOME} className="flex-1 sm:flex-none">
                           <Button
                              variant="outline"
                              size="lg"
                              className="w-full gap-2 border-2 transition-all duration-200 hover:scale-105"
                           >
                              <Home className="w-4 h-4" />
                              Back Home
                           </Button>
                        </Link>
                     </div>
                  </div>
               </div>

               {/* Decorative Background Elements */}
               <div className="fixed inset-0 -z-10 overflow-hidden">
                  <div className="absolute -top-40 -right-32 w-80 h-80 bg-red-200/10 rounded-full blur-3xl animate-pulse" />
                  <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-blue-200/10 rounded-full blur-3xl animate-pulse delay-1000" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-200/5 rounded-full blur-3xl animate-pulse delay-500" />
               </div>
            </div>
         </body>
      </html>
   );
}
