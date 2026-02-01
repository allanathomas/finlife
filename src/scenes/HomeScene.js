import Phaser from "phaser"
import { gameState } from "../GameState.js"

export class HomeScene extends Phaser.Scene {
  constructor() {
    super("HomeScene")
  }

  // Track starting money for the week
  init() {
    // If not set, set startingBank for the week
    if (gameState.startingBank === undefined || gameState.week === 0) {
      gameState.startingBank = gameState.bank;
    }
  }

preload() {
    this.load.image("userFr", "/pictures/userFr.png");
    this.load.image("home", "/pictures/home.png")
    this.load.image("nextButton", "/pictures/NEXT.png")
}

  create() {
    const { centerX, centerY } = this.cameras.main

    // Background
    const bg = this.add.image(centerX, centerY, "home")
    bg.setDisplaySize(this.cameras.main.width, this.cameras.main.height)


    // Save last week's starting bank for reward check
    if (gameState.week >= 0 && gameState.startingBank !== undefined) {
      // Only check if not first week
      if (gameState.bank >= gameState.startingBank / 2 && gameState.week > 0) {
        // Give bonus and show popup
        gameState.bank += 50;
        this.showSavingReward();
      }
    }

    gameState.week += 1;
    if ((gameState.week % 2) == 0) gameState.bank += 200;
    gameState.piggyBalance = (gameState.piggyBalance ?? 0) + 2;  // Piggy balance +2 every week
    // Set new starting bank for this week
    gameState.startingBank = gameState.bank;

    // Add userFr image (top left corner)
        this.add.image(100, 45, 'userFr')
          .setOrigin(0.5)
          .setScale(0.5, 0.3);

    // BANK TEXT (always visible)
    this.bankText = this.add.text(20, 20, `Bank: $${gameState.bank}`, {
      fontSize: "22px",
      color: "#000000",
    })

    this.weekText = this.add.text(20, 50, `Week: ${gameState.week}`, {
      fontSize: "22px",
      color: "#000000",
    })
    // Escape key to return to MainMenu
    this.input.keyboard.on('keydown-ESC', () => {
      this.scene.start('MainMenu');
    });
const messages = [
      `Welcome Home!`,
      `It is now week ${gameState.week}, and you have saved $${gameState.bank} in your piggy bank. Remember: Every week is a shopping week!`,
      ]
    
    let next = 1

    // character check
    if (gameState.character.health <= 0) {
      next -= 1
      messages.push("Your health is at 0!")
      messages.push("Game Over!")
    } if (gameState.character.happiness <= 0) {
      next -= 1
      messages.push("Your happiness is at 0!")
      messages.push("Game Over!")
    } if (gameState.pet.happiness <= 0 || gameState.pet.health <= 0) {
      next -= 1
      messages.push("Your pet was not taken care of!")
      messages.push("Game Over!")
    }

  // show dialogue once
  this.showDialogue(messages)

    if (next < 1){
    // Add NEXT image button
    const nextBtn = this.add.image(this.cameras.main.width - 80, this.cameras.main.height - 60, "nextButton")
      .setScale(0.22)
      .setInteractive();
      gameState.reset()
    nextBtn.on("pointerdown", () => {
      this.scene.start("GameScene");
    });
    } else {
      // Add NEXT image button
    const nextBtn = this.add.image(this.cameras.main.width - 80, this.cameras.main.height - 60, "nextButton")
      .setScale(0.22)
      .setInteractive();
    nextBtn.on("pointerdown", () => {
      this.scene.start("TownScene");
    });
    }

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

  showSavingReward() {
    const centerX = this.cameras.main.centerX;
    const centerY = this.cameras.main.height / 2;
    const box = this.add.rectangle(centerX, centerY - 100, 700, 250, 0x4caf50, 0.95);
    box.setStrokeStyle(4, 0xffffff);
    const text = this.add.text(centerX - 320, centerY - 220,
      "Congratulations!\n\nYou saved at least half of your money this week!\n\nSaving means putting some money aside instead of spending it all, so you can use it for something important or fun in the future.",
      {
        fontSize: "28px",
        color: "#ffffff",
        wordWrap: { width: 650 },
      }
    );
    const okBtn = this.add.text(centerX, centerY + 50, "OK", {
      fontSize: "32px",
      color: "#000",
      backgroundColor: "#fff",
      padding: { left: 30, right: 30, top: 10, bottom: 10 },
      borderRadius: 10,
    }).setOrigin(0.5).setInteractive();
    okBtn.on("pointerdown", () => {
      box.destroy();
      text.destroy();
      okBtn.destroy();
    });
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

