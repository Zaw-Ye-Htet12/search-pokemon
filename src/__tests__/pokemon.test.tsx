import { bulbasaurMock, charmanderMock, squirtleMock } from './mocks/pokemon.mocks';

describe('Pokemon Type Tests', () => {
   describe('Bulbasaur', () => {
      it('should be a Grass type Pokemon', () => {
         expect(bulbasaurMock.types).toContain('Grass');
      });

      it('should have Grass as its primary type', () => {
         expect(bulbasaurMock.types[0]).toBe('Grass');
      });

      it('should also be a Poison type', () => {
         expect(bulbasaurMock.types).toContain('Poison');
      });

      it('should have exactly 2 types', () => {
         expect(bulbasaurMock.types).toHaveLength(2);
      });

      it('should have the correct name and number', () => {
         expect(bulbasaurMock.name).toBe('Bulbasaur');
         expect(bulbasaurMock.number).toBe('001'); // Changed to string
      });
   });

   describe('Charmander', () => {
      it('should be a Fire type Pokemon', () => {
         expect(charmanderMock.types).toContain('Fire');
      });

      it('should have Fire as its only type', () => {
         expect(charmanderMock.types).toEqual(['Fire']);
      });

      it('should have exactly 1 type', () => {
         expect(charmanderMock.types).toHaveLength(1);
      });

      it('should have the correct name and number', () => {
         expect(charmanderMock.name).toBe('Charmander');
         expect(charmanderMock.number).toBe('004'); // Changed to string
      });
   });

   describe('Squirtle', () => {
      it('should be a Water type Pokemon', () => {
         expect(squirtleMock.types).toContain('Water');
      });

      it('should have Water as its only type', () => {
         expect(squirtleMock.types).toEqual(['Water']);
      });

      it('should have exactly 1 type', () => {
         expect(squirtleMock.types).toHaveLength(1);
      });

      it('should have the correct name and number', () => {
         expect(squirtleMock.name).toBe('Squirtle');
         expect(squirtleMock.number).toBe('007'); // Changed to string
      });
   });

   describe('All Starter Pokemon', () => {
      it('should all be different types', () => {
         const bulbasaurType = bulbasaurMock.types[0];
         const charmanderType = charmanderMock.types[0];
         const squirtleType = squirtleMock.types[0];

         expect(bulbasaurType).not.toBe(charmanderType);
         expect(charmanderType).not.toBe(squirtleType);
         expect(squirtleType).not.toBe(bulbasaurType);
      });

      it('should all have valid pokemon numbers', () => {
         expect(bulbasaurMock.number).toBeTruthy();
         expect(charmanderMock.number).toBeTruthy();
         expect(squirtleMock.number).toBeTruthy();
      });

      it('should all have images', () => {
         expect(bulbasaurMock.image).toContain('http');
         expect(charmanderMock.image).toContain('http');
         expect(squirtleMock.image).toContain('http');
      });
   });
});
