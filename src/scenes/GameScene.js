import Phaser from "phaser"

export class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene")
  }

  init(data) {
    this.character = data.character || "A"
  }

  create() {
    // --- Basic UI ---
    this.add.text(20, 20, `Character: ${this.character}`, {
      fontSize: "22px",
      color: "#ffffff",
    })

    // Bank account (always visible)
    this.bankAmount = 0
    this.bankText = this.add.text(20, 50, `Bank: $${this.bankAmount}`, {
      fontSize: "22px",
      color: "#ffffff",
    })

    // Salary
    this.salary = 2000
    this.add.text(20, 80, `Salary: $${this.salary} / month`, {
      fontSize: "22px",
      color: "#ffffff",
    })

    // Health + Happiness bars
    this.health = 100
    this.happiness = 100

    this.healthBar = this.add.graphics()
    this.happinessBar = this.add.graphics()
    this.drawBars()

    // Pet
    this.pet = "Dog"
    this.add.text(20, 150, `Pet: ${this.pet}`, {
      fontSize: "22px",
      color: "#ffffff",
    })

    // Explanation text
    this.add.text(20, 200,
      "Salary = money you earn from work each month.\nBank account = where your money is stored safely.",
      {
        fontSize: "18px",
        color: "#ffffff",
        lineSpacing: 6,
      }
    )

    // Give salary automatically
    this.time.addEvent({
      delay: 2000, // every 2 seconds for demo
      loop: true,
      callback: () => {
        this.bankAmount += this.salary
        this.bankText.setText(`Bank: $${this.bankAmount}`)
      }
    })
  }

  drawBars() {
    // Health bar background
    this.healthBar.clear()
    this.healthBar.fillStyle(0x555555)
    this.healthBar.fillRect(20, 110, 200, 20)

    // Health fill
    this.healthBar.fillStyle(0xff0000)
    this.healthBar.fillRect(20, 110, 2 * this.health, 20)

    // Happiness bar background
    this.happinessBar.clear()
    this.happinessBar.fillStyle(0x555555)
    this.happinessBar.fillRect(20, 140, 200, 20)

    // Happiness fill
    this.happinessBar.fillStyle(0xffff00)
    this.happinessBar.fillRect(20, 140, 2 * this.happiness, 20)
  }
}