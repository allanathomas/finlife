import Phaser from "phaser"
import { gameState } from "../GameState.js"

export class ClinicScene extends Phaser.Scene {
  constructor() {
    super("ClinicScene")
  }

  preload() {
    this.load.image("clinic", "pictures/clinic.png")
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
