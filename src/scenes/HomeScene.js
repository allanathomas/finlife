import Phaser from "phaser"

export class HomeScene extends Phaser.Scene {
  constructor() {
    super("HomeScene")
  }

  create() {
    const centerX = this.cameras.main.centerX
    const centerY = this.cameras.main.centerY

    this.add.text(centerX, centerY, "Home", {
      fontSize: "48px",
      color: "#ffffff",
    }).setOrigin(0.5)
  }
}
