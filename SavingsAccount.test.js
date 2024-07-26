const SavingsAccount = require("./SavingsAccount");

describe("SavingsAccount", () => {
  let account;

  beforeEach(() => {
    account = new SavingsAccount(2);
  });

  test("should correctly calculate interest for a single deposit of $1000 over 90 days", () => {
    account.deposit(1000, "2024-01-01");
    const interest = account.calculateInterest("2024-04-01");
    console.log(`Calculated Interest for Single Deposit: ${interest}`);
    expect(interest).toBeCloseTo(5, 1);
  });

  test("should correctly calculate interest after a deposit of $1000 followed by a withdrawal of $500", () => {
    account.deposit(1000, "2024-01-01");
    account.withdraw(500, "2024-02-01");
    const interest = account.calculateInterest("2024-04-01");
    console.log(
      `Calculated Interest After Deposit and Withdrawal: ${interest}`
    );
    expect(interest).toBeCloseTo(3.35, 1);
  });

  test("should calculate interest accurately for multiple deposits totaling $1500", () => {
    account.deposit(1000, "2024-01-01");
    account.deposit(500, "2024-02-01");
    const interest = account.calculateInterest("2024-04-01");
    console.log(`Calculated Interest for Multiple Deposits: ${interest}`);
    expect(interest).toBeCloseTo(6.64, 1);
  });

  test("should project available balance correctly after 90 days for multiple transactions", () => {
    account.deposit(1000, "2024-01-01");
    account.deposit(500, "2024-02-01");
    const availableBalance = account.projectAvailableBalance("2024-04-01");
    console.log(
      `Projected Available Balance After 90 Days: ${availableBalance}`
    );
    expect(availableBalance).toBeCloseTo(1504.94, 1);
  });

  test("should project the total balance accurately after multiple transactions", () => {
    account.deposit(1000, "2024-01-01");
    account.deposit(500, "2024-02-01");
    const totalBalance = account.projectTotalBalance("2024-04-01");
    console.log(`Projected Total Balance After Transactions: ${totalBalance}`);
    expect(totalBalance).toBeCloseTo(1506.64, 1);
  });

  test("should correctly handle cases with no transactions", () => {
    const interest = account.calculateInterest("2024-04-01");
    console.log(`Calculated Interest with No Transactions: ${interest}`);
    expect(interest).toBeCloseTo(0, 2);
  });

  test("should calculate interest correctly after multiple withdrawals following a deposit", () => {
    account.deposit(2000, "2024-01-01");
    account.withdraw(500, "2024-01-15");
    account.withdraw(500, "2024-02-01");
    const interest = account.calculateInterest("2024-04-01");
    console.log(`Calculated Interest After Multiple Withdrawals: ${interest}`);
    expect(interest).toBeCloseTo(6.23, 1);
  });

  test("should handle edge case of withdrawal before 90 days without additional interest penalty", () => {
    account.deposit(1000, "2024-01-01");
    account.withdraw(500, "2024-03-01");
    const availableBalance = account.projectAvailableBalance("2024-04-01");
    console.log(
      `Available Balance with Withdrawal Before 90 Days: ${availableBalance}`
    );
    expect(availableBalance).toBeCloseTo(500.85, 1);
  });
});
