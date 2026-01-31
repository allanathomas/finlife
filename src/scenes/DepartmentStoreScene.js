import Phaser from "phaser"

export class DepartmentStoreScene extends Phaser.Scene {
  constructor() {
    super("DepartmentStoreScene")
  }

  create() {
    const centerX = this.cameras.main.centerX
    const centerY = this.cameras.main.centerY

    this.add.text(centerX, centerY, "Department Store", {
      fontSize: "48px",
      color: "#ffffff",
    }).setOrigin(0.5)
  }
}
