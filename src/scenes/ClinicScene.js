import Phaser from "phaser"

export class ClinicScene extends Phaser.Scene {
  constructor() {
    super("ClinicScene")
  }

  create() {
    const centerX = this.cameras.main.centerX
    const centerY = this.cameras.main.centerY

    this.add.text(centerX, centerY, "Clinic", {
      fontSize: "48px",
      color: "#ffffff",
    }).setOrigin(0.5)
  }
}
