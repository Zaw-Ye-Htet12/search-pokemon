import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Home, Search } from 'lucide-react';
import Link from 'next/link';
import { Routes } from '@/config/routes';

interface EmptyStateProps {
   icon?: React.ReactNode;
   title: string;
   description: string;
   action?: {
      label: string;
      onClick: () => void;
   };
   showHomeButton?: boolean;
   className?: string;
}

export function EmptyState({
   icon = <Search className="w-16 h-16 text-muted-foreground" />,
   title,
   description,
   action,
   showHomeButton = true,
   className,
}: EmptyStateProps) {
   return (
      <div className={cn('flex flex-col items-center justify-center py-16 px-4 text-center', className)}>
         <div className="mb-6 text-muted-foreground">{icon}</div>

         <div className="space-y-3 max-w-sm">
            <h3 className="text-xl font-semibold text-foreground">{title}</h3>
            <p className="text-muted-foreground leading-relaxed">{description}</p>
         </div>

         <div className="flex flex-col sm:flex-row gap-3 mt-8">
            {action && (
               <Button onClick={action.onClick} className="gap-2">
                  <Search className="w-4 h-4" />
                  {action.label}
               </Button>
            )}

            {showHomeButton && (
               <Link href={Routes.HOME}>
                  <Button variant="outline" className="gap-2">
                     <Home className="w-4 h-4" />
                     Back to Home
                  </Button>
               </Link>
            )}
         </div>
      </div>
   );
}

export default EmptyState;
