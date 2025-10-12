import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface PokemonCardSkeletonProps {
   className?: string;
}

export function PokemonCardSkeleton({ className }: PokemonCardSkeletonProps) {
   return (
      <Card className={cn('animate-pulse border-0 bg-muted/20', className)}>
         <CardHeader className="relative pb-3 pt-4 px-4">
            {/* Image Skeleton */}
            <div className="flex justify-center mb-3">
               <Skeleton className="h-20 w-20 rounded-full" />
            </div>

            {/* Header Info Row */}
            <div className="flex items-center justify-between">
               <Skeleton className="h-5 w-12 rounded-full" />
               <Skeleton className="h-5 w-12 rounded-full" />
            </div>
         </CardHeader>

         <CardContent className="flex flex-col space-y-3 px-4 pb-3">
            {/* Name and Classification */}
            <div className="text-center space-y-2">
               <Skeleton className="h-5 w-24 mx-auto" />
               <Skeleton className="h-3 w-16 mx-auto" />
            </div>

            {/* Types */}
            <div className="flex gap-2 justify-center">
               <Skeleton className="h-5 w-12 rounded-full" />
               <Skeleton className="h-5 w-12 rounded-full" />
            </div>

            {/* Physical Stats */}
            <div className="grid grid-cols-2 gap-2">
               <Skeleton className="h-10 rounded-lg" />
               <Skeleton className="h-10 rounded-lg" />
            </div>
         </CardContent>

         <CardFooter className="px-4 pb-4 pt-0">
            <div className="w-full grid grid-cols-2 gap-3">
               <Skeleton className="h-12 rounded-lg" />
               <Skeleton className="h-12 rounded-lg" />
            </div>
            <div className="flex justify-between w-full mt-2">
               <Skeleton className="h-4 w-12" />
               <Skeleton className="h-4 w-12" />
            </div>
         </CardFooter>
      </Card>
   );
}
