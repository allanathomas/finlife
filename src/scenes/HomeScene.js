import Phaser from "phaser"
import { gameState } from "../GameState.js"

export class HomeScene extends Phaser.Scene {
  constructor() {
    super("HomeScene")
  }

preload() {
    this.load.image("home", "/pictures/home.png")
    this.load.image("nextButton", "/pictures/NEXT.png")
}

  create() {
    const { centerX, centerY } = this.cameras.main

    // Background
    const bg = this.add.image(centerX, centerY, "home")
    bg.setDisplaySize(this.cameras.main.width, this.cameras.main.height)

    gameState.week += 1
    if ((gameState.week % 2) == 0) gameState.bank += 200

    // BANK TEXT (always visible)
    this.bankText = this.add.text(20, 20, `Bank: $${gameState.bank}`, {
      fontSize: "22px",
      color: "#ffffff",
    })

    this.weekText = this.add.text(20, 50, `Week: ${gameState.week}`, {
      fontSize: "22px",
      color: "#ffffff",
    })

    this.showDialogue([
      `Welcome Home!`,
      `It is now week ${gameState.week}, and you have $${gameState.bank}.`,
    ])

    this.add.image(400, 400, "nextButton")
      .setScale(0.2)
      .setInteractive()
      .on("pointerdown", () => {
      this.scene.start("GroceryScene")
    })

  }

  showDialogue(messages) {
    this.dialogueMessages = messages
    this.dialogueIndex = 0

    const centerX = this.cameras.main.centerX
    const centerY = this.cameras.main.height - 180

    this.dialogueBox = this.add.rectangle(centerX, centerY, 900, 220, 0x000000, 0.8)
    this.dialogueBox.setStrokeStyle(2, 0xffffff)

    this.dialogueText = this.add.text(centerX - 430, centerY - 70, "", {
      fontSize: "24px",
      color: "#ffffff",
      wordWrap: { width: 860 },
    })

    this.nextButton = this.add.image(centerX + 360, centerY + 60, "nextButton")
      .setScale(0.2)
      .setInteractive()

    this.nextButton.on("pointerdown", () => {
      this.nextDialogue()
    })

    this.nextDialogue()
  }

  nextDialogue() {
    if (!this.dialogueMessages) return

    if (this.dialogueIndex >= this.dialogueMessages.length) {
      this.dialogueBox.destroy()
      this.dialogueText.destroy()
      this.nextButton.destroy()
      return
    }

    this.dialogueText.setText(this.dialogueMessages[this.dialogueIndex])
    this.dialogueIndex++
  }
}


