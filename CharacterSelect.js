import Phaser from "phaser"

export class CharacterSelect extends Phaser.Scene {
  constructor() {
    super("CharacterSelect")
  }

  create() {
    this.add.text(400, 80, "Choose your character", {
      fontSize: "32px",
      color: "#ffffff",
    }).setOrigin(0.5)

    // Character A
    const charA = this.add.text(250, 250, "Character A", {
      fontSize: "28px",
      color: "#ffffff",
      backgroundColor: "#2196f3",
      padding: { x: 20, y: 10 },
    }).setOrigin(0.5)

    // Character B
    const charB = this.add.text(550, 250, "Character B", {
      fontSize: "28px",
      color: "#ffffff",
      backgroundColor: "#ff5722",
      padding: { x: 20, y: 10 },
    }).setOrigin(0.5)

    charA.setInteractive()
    charB.setInteractive()

    charA.on("pointerdown", () => {
      this.scene.start("GameScene", { character: "A" })
    })

    charB.on("pointerdown", () => {
      this.scene.start("GameScene", { character: "B" })
    })
  }
}