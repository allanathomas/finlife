export class PiggyBank {
  constructor(initialBalance = 0) {
    this.balance = Math.max(0, initialBalance);
  }

  /**
   * Adds a positive amount to the piggy bank.
   * Rejects negative or zero values.
   * @param {number} amount - The amount to deposit
   * @returns {boolean} - true if successful, false if rejected
   */
  deposit(amount) {
    if (amount <= 0 || typeof amount !== "number" || !Number.isFinite(amount)) {
      return false;
    }
    this.balance += amount;
    return true;
  }

  /**
   * Subtracts amount only if balance is sufficient.
   * Otherwise, does nothing and returns false.
   * @param {number} amount - The amount to withdraw
   * @returns {boolean} - true if successful, false if insufficient or invalid
   */
  withdraw(amount) {
    if (amount <= 0 || typeof amount !== "number" || !Number.isFinite(amount)) {
      return false;
    }
    if (amount > this.balance) {
      return false;
    }
    this.balance -= amount;
    return true;
  }
}
