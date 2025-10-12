// components/pagination.tsx
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
   totalItems: number;
   itemsPerPage: number;
   currentPage: number;
   className?: string;
}

export default function Pagination({ totalItems, itemsPerPage, currentPage, className = '' }: PaginationProps) {
   const router = useRouter();
   const searchParams = useSearchParams();

   const totalPages = Math.ceil(totalItems / itemsPerPage);

   // Don't render if there's only one page
   if (totalPages <= 1) return null;

   const updatePage = (newPage: number) => {
      const params = new URLSearchParams(searchParams.toString());

      if (newPage === 1) {
         params.delete('page');
      } else {
         params.set('page', newPage.toString());
      }

      router.push(`?${params.toString()}`, { scroll: false });
   };

   const updateItemsPerPage = (newLimit: number) => {
      const params = new URLSearchParams(searchParams.toString());

      if (newLimit === 10) {
         params.delete('limit');
      } else {
         params.set('limit', newLimit.toString());
      }

      // Reset to first page when changing limit
      params.delete('page');

      router.push(`?${params.toString()}`, { scroll: false });
   };

   const getVisiblePages = () => {
      const delta = 2;
      const range = [];
      const rangeWithDots = [];

      for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
         range.push(i);
      }

      if (currentPage - delta > 2) {
         rangeWithDots.push(1, '...');
      } else {
         rangeWithDots.push(1);
      }

      rangeWithDots.push(...range);

      if (currentPage + delta < totalPages - 1) {
         rangeWithDots.push('...', totalPages);
      } else {
         rangeWithDots.push(totalPages);
      }

      return rangeWithDots;
   };

   return (
      <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 ${className}`}>
         {/* Items per page selector */}
         <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Items per page:</span>
            <select
               value={itemsPerPage}
               onChange={(e) => updateItemsPerPage(Number(e.target.value))}
               className="border border-gray-300 rounded-md px-2 py-1 text-sm"
            >
               <option value={10}>10</option>
               <option value={25}>25</option>
               <option value={50}>50</option>
               <option value={100}>100</option>
            </select>
         </div>

         {/* Page navigation */}
         <div className="flex items-center gap-1">
            {/* Previous button */}
            <button
               onClick={() => updatePage(currentPage - 1)}
               disabled={currentPage === 1}
               className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
               <ChevronLeft className="w-4 h-4" />
               Previous
            </button>

            {/* Page numbers */}
            {getVisiblePages().map((page, index) => (
               <button
                  key={index}
                  onClick={() => typeof page === 'number' && updatePage(page)}
                  disabled={page === '...'}
                  className={`px-3 py-2 text-sm font-medium border rounded-md min-w-[40px] ${
                     page === currentPage
                        ? 'bg-blue-600 text-white border-blue-600'
                        : page === '...'
                          ? 'text-gray-400 cursor-default'
                          : 'text-gray-700 bg-white border-gray-300 hover:bg-gray-50'
                  }`}
               >
                  {page}
               </button>
            ))}

            {/* Next button */}
            <button
               onClick={() => updatePage(currentPage + 1)}
               disabled={currentPage === totalPages}
               className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
               Next
               <ChevronRight className="w-4 h-4" />
            </button>
         </div>

         {/* Page info */}
         <div className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
         </div>
      </div>
   );
}
