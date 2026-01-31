import Phaser from "phaser"

export class BankScene extends Phaser.Scene {
  constructor() {
    super("BankScene")
  }

  init(data) {
    this.bankAmount = data.bankAmount || 0
  }

  create() {
    this.bankText = this.add.text(20, 20, `Bank: $${this.bankAmount}`, {
      fontSize: "24px",
      color: "#ffffff",
    })
    this.bankText.setScrollFactor(0)
  }

  updateBank(amount) {
    this.bankAmount = amount
    this.bankText.setText(`Bank: $${this.bankAmount}`)
  }
}
