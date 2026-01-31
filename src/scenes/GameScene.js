import Phaser from "phaser"

export class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene")
  }

  init(data) {
    this.character = data.character || "A"
  }

  create() {
    // UI
    this.bankAmount = 0
    this.salary = 2000
    this.pet = "Dog"
    this.health = 100
    this.happiness = 100

    this.bankText = this.add.text(20, 50, `Bank: $${this.bankAmount}`, { fontSize: "22px", color: "#ffffff" })
    this.salaryText = this.add.text(20, 80, `Salary: $${this.salary} / month`, { fontSize: "22px", color: "#ffffff" })
    this.petText = this.add.text(20, 150, `Pet: ${this.pet}`, { fontSize: "22px", color: "#ffffff" })

    this.healthBar = this.add.graphics()
    this.happinessBar = this.add.graphics()
    this.drawBars()

    // Salary event
    this.time.addEvent({
      delay: 2000,
      loop: true,
      callback: () => {
        this.bankAmount += this.salary
        this.bankText.setText(`Bank: $${this.bankAmount}`)
      }
    })

    // Dialogue queue
    this.showDialogue([
      "Welcome to FinLife!",
      "This is you.",
      "This is your dog.",
      "You will have to take care of yourself and your pet.",
      "Make sure you make good financial decisions!",
      "Here is your Bank Account.",
      "A Bank Account is a kind of piggy bank.",
      "Here is your salary.",
      "A salary is money you get from working a job.",
      "Your salary is used to pay for expenses."
    ])
  }

  drawBars() {
    this.healthBar.clear()
    this.healthBar.fillStyle(0x555555)
    this.healthBar.fillRect(20, 110, 200, 20)

    this.healthBar.fillStyle(0xff0000)
    this.healthBar.fillRect(20, 110, 2 * this.health, 20)

    this.happinessBar.clear()
    this.happinessBar.fillStyle(0x555555)
    this.happinessBar.fillRect(20, 140, 200, 20)

    this.happinessBar.fillStyle(0xffff00)
    this.happinessBar.fillRect(20, 140, 2 * this.happiness, 20)
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

    this.nextButton = this.add.text(centerX + 360, centerY + 60, "NEXT", {
      fontSize: "22px",
      color: "#ffffff",
      backgroundColor: "#2e86de",
      padding: { x: 10, y: 6 },
    }).setInteractive()

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
