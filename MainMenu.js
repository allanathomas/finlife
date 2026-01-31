import Phaser from "phaser"

export class MainMenu extends Phaser.Scene {
  constructor() {
    super("MainMenu")
  }

  create() {
    this.add.text(400, 150, "FINLIFE", {
      fontSize: "128px",
      color: "#ffffff",
    }).setOrigin(0.5)

    const playButton = this.add.text(400, 350, "PLAY", {
      fontSize: "80px",
      color: "#ffffff",
      backgroundColor: "#4caf50",
      padding: { x: 20, y: 10 },
    }).setOrigin(0.5)

    playButton.setInteractive()
    playButton.on("pointerdown", () => {
      this.scene.start("CharacterSelect")
    })
  }
}