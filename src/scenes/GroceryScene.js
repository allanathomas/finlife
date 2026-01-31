import Phaser from "phaser"

export class GroceryScene extends Phaser.Scene {
  constructor() {
    super("GroceryScene")
  }

  create() {
    const centerX = this.cameras.main.centerX
    const centerY = this.cameras.main.centerY

    this.add.text(centerX, centerY, "Grocery", {
      fontSize: "48px",
      color: "#ffffff",
    }).setOrigin(0.5)
  }
}
