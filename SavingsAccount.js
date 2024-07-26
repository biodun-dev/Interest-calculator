class SavingsAccount {
    constructor(interestRate) {
      this.interestRate = interestRate / 100 / 365;
      this.transactions = [];
    }
  
    deposit(amount, date) {
      this.transactions.push({ type: "deposit", amount, date: new Date(date) });
    }
  
    withdraw(amount, date) {
      this.transactions.push({
        type: "withdrawal",
        amount,
        date: new Date(date),
      });
    }
  
    calculateInterest(endDate) {
      endDate = new Date(endDate);
      let balance = 0;
      let interest = 0;
      let currentDate =
        this.transactions.length > 0
          ? new Date(this.transactions[0].date)
          : new Date();
  
      this.transactions.sort((a, b) => a.date - b.date);
  
      for (const transaction of this.transactions) {
        while (currentDate <= transaction.date) {
          interest += balance * this.interestRate;
          currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
        }
        balance +=
          transaction.type === "deposit"
            ? transaction.amount
            : -transaction.amount;
      }
  
      while (currentDate <= endDate) {
        interest += balance * this.interestRate;
        currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
      }
  
      return parseFloat(interest.toFixed(2));
    }
  
    projectAvailableBalance(endDate) {
      endDate = new Date(endDate);
      let balance = 0;
      let lastDate = null;
  
      for (let transaction of this.transactions) {
        const days = lastDate ? (transaction.date - lastDate) / 86400000 : 0;
        if (lastDate && days >= 90) {
          balance *= Math.pow(1 + this.interestRate, days);
        }
        balance +=
          transaction.type === "deposit"
            ? transaction.amount
            : -transaction.amount;
        lastDate = transaction.date;
      }
  
      const days = (endDate - lastDate) / 86400000;
      if (lastDate) {
        balance *= Math.pow(1 + this.interestRate, days);
      }
  
      return parseFloat(balance.toFixed(2));
    }
  
    projectTotalBalance(endDate) {
      const balance = this.transactions.reduce(
        (acc, transaction) =>
          acc +
          (transaction.type === "deposit"
            ? transaction.amount
            : -transaction.amount),
        0
      );
      const interest = this.calculateInterest(endDate);
      return parseFloat((balance + interest).toFixed(2));
    }
  }
  
  module.exports = SavingsAccount;
  