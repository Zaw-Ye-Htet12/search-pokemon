// hooks/use-pagination.ts
import { useSearchParams } from 'next/navigation';

interface UsePaginationProps {
   defaultLimit?: number;
   defaultPage?: number;
}

export function usePagination({ defaultLimit = 12, defaultPage = 1 }: UsePaginationProps = {}) {
   const searchParams = useSearchParams();

   const page = Number(searchParams.get('page')) || defaultPage;
   const limit = Number(searchParams.get('limit')) || defaultLimit;

   const offset = (page - 1) * limit;

   return {
      page,
      limit,
      offset,
      searchParams: Object.fromEntries(searchParams.entries()),
   };
}
