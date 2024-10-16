// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const arr1 = [1, 1, 1];
    expect(generateLinkedList(arr1)).toStrictEqual({
      value: 1,
      next: { value: 1, next: { value: 1, next: { value: null, next: null } } },
    });
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const arr2 = [2, 2, 2];
    expect(generateLinkedList(arr2)).toMatchSnapshot();
  });
});
