import Phaser from "phaser"
import { gameState } from "../GameState.js"
import { createCharacterDisplay } from "../CharacterDisplay.js"

export class TownScene extends Phaser.Scene {
    constructor() {
      super("TownScene")
    }

    preload() {
      this.load.image("townBg", "resources/road.png")
      this.load.image("userFr", "pictures/userFr.png");
      this.load.image("clinicButton", "resources/clinicIcon.png")
      this.load.image("shopButton", "resources/groceryIcon.png")
      this.load.image("houseButton", "resources/house.png")
      this.load.image("departmButton", "resources/departmIcon.png")
    }

    create() {
      const { centerX, centerY } = this.cameras.main    

      // Background
      const bg = this.add.image(centerX, centerY, "townBg")
      bg.setDisplaySize(this.cameras.main.width, this.cameras.main.height)

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

      // Add interactive buttons
      // Clinic Button
      const clinicBtn = this.add.image(centerX - 200, centerY - 50, 'clinicButton').setInteractive().setScale(0.6);
      clinicBtn.on('pointerdown', () => {
        this.scene.start('ClinicScene');
      });

      // Shop Button (Grocery)
      const shopBtn = this.add.image(centerX + 300, centerY + 100, 'shopButton').setInteractive().setScale(0.5);
      shopBtn.on('pointerdown', () => {
        this.scene.start('GroceryScene');
      });

      // Department Store Button
      const departmBtn = this.add.image(centerX + 300, centerY - 70, 'departmButton').setInteractive().setScale(0.5);
      departmBtn.on('pointerdown', () => {
        this.scene.start('DepartmentStoreScene');
      });

      // Escape key to return to MainMenu
      this.input.keyboard.on('keydown-ESC', () => {
        this.scene.start('MainMenu');
      });
  }
}
