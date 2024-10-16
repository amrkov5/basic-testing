// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.clearAllTimers();
  });
  afterAll(() => {
    jest.restoreAllMocks();
    jest.useRealTimers();
  });
  test('should create instance with provided base url', async () => {
    (axios.create as jest.Mock).mockReturnValue({
      get: jest.fn().mockResolvedValue({ data: 'data' }),
    });
    await throttledGetDataFromApi('path');
    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const axiosClientMock = {
      get: jest.fn().mockResolvedValue({ data: 'data' }),
    };
    (axios.create as jest.Mock).mockReturnValue(axiosClientMock);
    jest.advanceTimersByTime(5000);
    await throttledGetDataFromApi('path');
    expect(axiosClientMock.get).toHaveBeenCalledWith('path');
  });

  test('should return response data', async () => {
    (axios.create as jest.Mock).mockReturnValue({
      get: jest.fn().mockResolvedValue({ data: 'data' }),
    });
    const result = await throttledGetDataFromApi('path');
    expect(result).toBe('data');
  });
});
