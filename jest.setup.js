import '@testing-library/jest-dom';

// Mock next/navigation
jest.mock('next/navigation', () => ({
   useRouter() {
      return {
         push: jest.fn(),
         replace: jest.fn(),
         prefetch: jest.fn(),
         back: jest.fn(),
         forward: jest.fn(),
         refresh: jest.fn(),
      };
   },
   useSearchParams() {
      return {
         get: jest.fn(),
         getAll: jest.fn(),
         has: jest.fn(),
         keys: jest.fn(() => [][Symbol.iterator]()),
         values: jest.fn(() => [][Symbol.iterator]()),
         entries: jest.fn(() => [][Symbol.iterator]()),
         forEach: jest.fn(),
         toString: jest.fn(() => ''),
      };
   },
   usePathname() {
      return '';
   },
   useParams() {
      return {};
   },
   redirect: jest.fn(),
   notFound: jest.fn(),
}));
