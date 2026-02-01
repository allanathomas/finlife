import Phaser from "phaser"
import { gameState } from "../GameState.js"
import { createCharacterDisplay } from "../CharacterDisplay.js"
import { createPetDisplay } from "../PetDisplay.js"
import { createPiggyDisplay } from "../PiggyDisplay.js"

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
      this.load.image("piggy", "pictures/piggy.png")
      this.load.spritesheet("girl", "resources/girlchar.png", { frameWidth: 32, frameHeight: 32 })
      this.load.spritesheet("boy", "resources/boychar.png", { frameWidth: 32, frameHeight: 32 })
      this.load.spritesheet("dog", "resources/dog.png", { frameWidth: 32, frameHeight: 32 })
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

      // Add piggy display (clickable, shows Invest/Withdraw popup)
      this.piggyDisplay = createPiggyDisplay(this, {
        x: 300,
        y: 0,
        balanceTextX: 350,
        balanceTextY: 40,
        onBalanceChange: () => this.bankText?.setText(`Bank: $${gameState.bank}`),
      });

      // Add character display with bars (centered along x-axis, 20 lower and 20 right)
      const characterX = centerX - 85 + 20  // Offset so character+pet pair is centered, then 20 right
      const characterY = 250 + 100 + (this.cameras.main.height / 4) + 20
      const charScale = 0.7
      const baseCharacterWidth = this.cameras.main.width / 3
      const baseCharacterHeight = this.cameras.main.height / 2
      const characterWidth = baseCharacterWidth * charScale
      const characterHeight = baseCharacterHeight * charScale
      this.characterDisplay = createCharacterDisplay(this, {
        x: characterX,
        y: characterY,
        width: characterWidth,
        height: characterHeight,
        depth: 20
      })
      const petScale = 0.4
      const petX = characterX + 170
      const petY = characterY + 130
      this.petDisplay = createPetDisplay(this, {
        x: petX,
        y: petY,
        width: characterWidth * petScale,
        height: characterHeight * petScale,
        depth: 20
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

      // Non-interactive House Icon (for display only)
      this.add.image(centerX - 600, centerY + 80, 'houseButton').setScale(1.5).setAlpha(0.85);

      // Escape key to return to MainMenu
      this.input.keyboard.on('keydown-ESC', () => {
        this.scene.start('MainMenu');
      });
  }

}
