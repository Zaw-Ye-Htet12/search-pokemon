'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
   return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
         <div className="text-center max-w-md mx-auto">
            {/* Simple Icon */}
            <div className="text-6xl mb-6">🔍</div>

            {/* Error Code */}
            <div className="text-9xl font-bold text-muted-foreground mb-4">404</div>

            {/* Title */}
            <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>

            {/* Description */}
            <p className="text-lg text-muted-foreground mb-8">
               Oops! The page you are looking for seems to have wandered off into the tall grass. Lets get you back to
               safety.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
               <Link href="/">
                  <Button className="gap-2">
                     <Home className="w-4 h-4" />
                     Back Home
                  </Button>
               </Link>

               <Link href="/">
                  <Button variant="outline" className="gap-2">
                     <Search className="w-4 h-4" />
                     Search Pokémon
                  </Button>
               </Link>
            </div>

            {/* Quick Tips */}
            <div className="mt-8 p-4 bg-muted/50 rounded-lg">
               <p className="text-sm text-muted-foreground">
                  <strong>Tip:</strong> Use the search bar in the navigation to find specific Pokémon
               </p>
            </div>
         </div>
      </div>
   );
}
