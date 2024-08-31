import { extractNumber, transformDataInMoth, transformDataInYear } from "../src/functions"

describe('test the projects auxiliary functions', () => {
  test('testing the function transformDataInMoth', () => {
    expect(transformDataInMoth(new Date('2024-06-13'))).toBe(6)
  });

  test('testing the funcition transformDataInYear', () => {
    expect(transformDataInYear(new Date('2024-06-13'))).toBe(2024)
  });

  test('testing the function extractNumber', () => {
    expect(extractNumber('120 m³')).toBe(120)
  });
});
