import Phaser from "phaser"
import { gameState } from "../GameState.js"

export class ClinicScene extends Phaser.Scene {
  constructor() {
    super("ClinicScene")
  }

  preload() {
    this.load.image("clinic", "pictures/clinic.png")
    this.load.image("nextButton", "/pictures/NEXT.png")

  }

  create() {
    const { centerX, centerY } = this.cameras.main

    gameState.currentDeptList.forEach((item) => {
      if (gameState.needItems.includes(item.key)) {
        gameState.character.health -= 10
      }
      if (gameState.wantItems.includes(item.key)) {
        gameState.character.happiness -= 10
      }
    })

    // Background
    const bg = this.add.image(centerX, centerY, "clinic")
    bg.setDisplaySize(this.cameras.main.width, this.cameras.main.height)

    // BANK TEXT (always visible)
    this.bankText = this.add.text(20, 20, `Bank: $${gameState.bank}`, {
      fontSize: "22px",
      color: "#000000",
    })

    this.weekText = this.add.text(20, 50, `Week: ${gameState.week}`, {
      fontSize: "22px",
      color: "#000000",
    })

  const messages = [
    `Welcome to the clinic.`,
    `Your health is at ${gameState.character.health}.`,
  ]

  // character check
  if (gameState.character.health < 50) {
    messages.push("You are sick!")
    messages.push("You need to pay $30.")
    gameState.character.health += 40
    gameState.bank -= 30
  } else {
    messages.push("You are healthy!")
  }

  // pet check
  messages.push(`Your pet's health is at ${gameState.pet.health}.`)

  if (gameState.pet.health < 50) {
    messages.push("Your pet is sick!")
    messages.push("You need to pay $40.")
    gameState.pet.health += 40
    gameState.bank -= 40
  } else {
    messages.push("Your pet is healthy!")
  }

  // show dialogue once
  this.showDialogue(messages)


    this.add.image(400, 400, "nextButton")
      .setScale(0.2)
      .setInteractive()
      .on("pointerdown", () => {
      this.scene.start("HomeScene")
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
