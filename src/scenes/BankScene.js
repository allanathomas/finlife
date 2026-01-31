import Phaser from "phaser"
import { gameState } from "../GameState.js"

export class BankScene extends Phaser.Scene {
  constructor() {
    super("BankScene")
  }

  create() {
    this.bankText = this.add.text(20, 20, `Bank: $${gameState.bank}`, {
      fontSize: "24px",
      color: "#ffffff",
    })
    this.bankText.setScrollFactor(0)
  }

  update() {
    // Always sync with gameState so purchases in other scenes show correctly
    this.bankText.setText(`Bank: $${gameState.bank}`)
  }
}
