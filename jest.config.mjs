import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
   dir: './',
});

const customJestConfig = {
   setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
   testEnvironment: 'jest-environment-jsdom',
   moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1',
   },
   testMatch: [
      '**/__tests__/**/*.test.[jt]s?(x)',
      '**/__tests__/**/*.spec.[jt]s?(x)',
      '**/?(*.)+(spec|test).[jt]s?(x)',
   ],
   testPathIgnorePatterns: [
      '/node_modules/',
      '/.next/',
      '/mocks/',
      '/__tests__/mocks/',
      '\\.mock\\.[jt]sx?$',
      '\\.mocks\\.[jt]sx?$',
   ],
   collectCoverageFrom: [
      'src/**/*.{js,jsx,ts,tsx}',
      '!src/**/*.d.ts',
      '!src/**/*.stories.{js,jsx,ts,tsx}',
      '!src/**/__tests__/**',
      '!src/**/*.mock.{ts,tsx}',
      '!src/**/*.mocks.{ts,tsx}',
   ],
};

export default createJestConfig(customJestConfig);
