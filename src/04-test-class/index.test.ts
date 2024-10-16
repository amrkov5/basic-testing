// Uncomment the code below and write your tests
import { getBankAccount } from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const account = getBankAccount(500);
    expect(account.getBalance()).toBe(500);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = getBankAccount(0);
    expect(() => account.withdraw(1)).toThrow(
      'Insufficient funds: cannot withdraw more than 0',
    );
  });

  test('should throw error when transferring more than balance', () => {
    const account = getBankAccount(0);
    const toAccount = getBankAccount(0);
    expect(() => account.transfer(1, toAccount)).toThrow(
      'Insufficient funds: cannot withdraw more than 0',
    );
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(0);
    expect(() => account.transfer(1, account)).toThrow('Transfer failed');
  });

  test('should deposit money', () => {
    const account = getBankAccount(0);
    account.deposit(10);
    expect(account.getBalance()).toBe(10);
  });

  test('should withdraw money', () => {
    const account = getBankAccount(100);
    account.withdraw(99);
    expect(account.getBalance()).toBe(1);
  });

  test('should transfer money', () => {
    const account = getBankAccount(100);
    const toAccount = getBankAccount(0);
    account.transfer(100, toAccount);
    expect(account.getBalance()).toBe(0);
    expect(toAccount.getBalance()).toBe(100);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(100);
    const result = await account.fetchBalance();
    if (result) {
      expect(typeof result).toBe('number');
    } else {
      expect(result).toBeNull();
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(100);
    const fetchSpy = jest.spyOn(account, 'fetchBalance');
    fetchSpy.mockResolvedValueOnce(50);
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(50);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(100);
    const fetchSpy = jest.spyOn(account, 'fetchBalance');
    fetchSpy.mockResolvedValueOnce(null);
    await expect(account.synchronizeBalance()).rejects.toThrow(
      'Synchronization failed',
    );
  });
});
