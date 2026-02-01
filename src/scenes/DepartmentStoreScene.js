import Phaser from "phaser"
import { gameState } from "../GameState.js"
import { createCharacterDisplay } from "../CharacterDisplay.js"
import { createPetDisplay } from "../PetDisplay.js"


export class DepartmentStoreScene extends Phaser.Scene {
  constructor() {
    super("DepartmentStoreScene")
  }

  preload() {
    this.load.image("userFr", "/pictures/userFr.png")
    this.load.image("shelf", "resources/depshelf.avif")
    this.load.image("nextButton", "/pictures/NEXT.png")

    this.load.spritesheet("girl", "resources/girlchar.png", {
      frameWidth: 32,
      frameHeight: 32,
    })
    this.load.spritesheet("boy", "resources/boychar.png", {
      frameWidth: 32,
      frameHeight: 32,
    })
        this.load.spritesheet("dog", "resources/dog.png", {
      frameWidth: 32,
      frameHeight: 32,
    })

    this.load.image("bandages", "Pixel_Mart/bandage_box.png")
    this.load.image("batteries", "Pixel_Mart/batteries.png")
    this.load.image("lotion", "Pixel_Mart/body_lotion.png")
    this.load.image("pan", "Pixel_Mart/frying pan.png")
    this.load.image("detergent", "Pixel_Mart/detergent.png")
    this.load.image("sanitizer", "Pixel_Mart/hand_sanitiser.png")
    this.load.image("soap", "Pixel_Mart/soap.png")
    this.load.image("bulb", "Pixel_Mart/light_bulb.png")
    this.load.image("toiletpaper", "Pixel_Mart/toilet_paper.png")
    this.load.image("ducktopus", "Pixel_Mart/rubber_ducktopus.png")
    this.load.image("pencilcase", "Pixel_Mart/pencil_box.png")
    this.load.image("duck", "Pixel_Mart/rubber_duck.png")
  }

  create() {
    const { centerX, centerY } = this.cameras.main

    // Background
    const bg = this.add.image(centerX, centerY, "shelf")
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

    // Escape key to return to MainMenu
    this.input.keyboard.on('keydown-ESC', () => {
      this.scene.start('MainMenu');
    });

    // Store items
    this.items = [
      { key: "bandages", name: "Bandages", price: 7 },
      { key: "batteries", name: "Batteries", price: 12 },
      { key: "lotion", name: "Lotion", price: 8 },
      { key: "pan", name: "Frying Pan", price: 25 },
      { key: "detergent", name: "Detergent", price: 11 },
      { key: "sanitizer", name: "Hand Sanitizer", price: 2 },
      { key: "soap", name: "Soap", price: 3 },
      { key: "bulb", name: "Light Bulb", price: 6 },
      { key: "toiletpaper", name: "Toilet Paper", price: 4 },
      { key: "ducktopus", name: "Ducktopus", price: 15 },
      { key: "pencilcase", name: "Pencil Case", price: 13 },
      { key: "duck", name: "Rubber Duck", price: 12 },
    ]

    if (gameState.currentDeptList.length === 0) {
      gameState.currentDeptList = this.generateDeptList(this.items)
    }
    this.drawDeptList()

    // Add character display with bars (below the item list)
    // List ends around y: 20 + 40 + (5 * 30) = 210 for 6 items
    // Position character below the list
    const listEndY = 20 + 40 + (gameState.currentDeptList.length * 30)
    const characterY = listEndY + 100 + (this.cameras.main.height / 4) // more padding to move character lower
    this.characterDisplay = createCharacterDisplay(this, {
      x: this.cameras.main.width - 20 - (this.cameras.main.width / 6), // Aligned with list on right side
      y: characterY,
      width: this.cameras.main.width / 3,
      height: this.cameras.main.height / 2,
      depth: 20
    })

    // Shelf layout
    const startX = 200
    const startY = 140
    const gapX = 270
    const gapY = 260
    const itemsPerRow = 4

    this.items.forEach((item, index) => {
      const col = index % itemsPerRow
      const row = Math.floor(index / itemsPerRow)

      const x = startX + col * gapX
      const y = startY + row * gapY

      const icon = this.add.image(x, y, item.key)
        .setScale(3)
        .setInteractive({ useHandCursor: true })

      this.add.text(x, y + 70, `$${item.price}`, {
        fontSize: "22px",
        color: "#ffffff",
      }).setOrigin(0.5)

      icon.on("pointerdown", () => {
        this.buyItem(item, icon)
      })
    })

    // Add NEXT image button
    const nextBtn = this.add.image(this.cameras.main.width - 80, this.cameras.main.height - 60, "nextButton")
      .setScale(0.22)
      .setInteractive();
    nextBtn.on("pointerdown", () => {
      this.scene.start("ClinicScene");
    });
  }

  // BUY ITEM FUNCTION
  buyItem(item, icon) {
    // If a confirmation dialogue is open, close it before proceeding
    if (this.confirmDialogueOpen) {
      if (this.dialogueBox) this.dialogueBox.destroy();
      if (this.dialogueText) this.dialogueText.destroy();
      if (this.yesButton) this.yesButton.destroy();
      if (this.noButton) this.noButton.destroy();
      this.confirmDialogueOpen = false;
    }

    const index = gameState.currentDeptList.findIndex(i => i.key === item.key);
    // If not on department list, ask for confirmation
    if (index === -1) {
      if (gameState.bank < item.price) {
        this.showDialogue([`Not enough money to buy ${item.name}.`]);
        return;
      }
      const left = gameState.bank - item.price;
      this.showConfirmDialogue(
        [
          `${item.name} is not on your department list.`,
          `If you buy this, you will spend $${item.price}.`,
          `You will have $${left} left in your bank.`,
          '',
          `Remember: If you use your money for treats or toys now, you might not have enough for things you really need later,`,
          `like supplies for you or your pet!`,
          `Do you still want to buy this?`
        ],
        () => {
          gameState.bank -= item.price;
          this.bankText.setText(`Bank: $${gameState.bank}`);
          gameState.addToInventory(item);
          // Update health/happiness for wants
          if (gameState.isWant(item.key)) {
            gameState.updateStat("character", "happiness", 10);
            gameState.updateStat("character", "health", -3);
          }
          this.characterDisplay.updateBars();
          icon.setAlpha(0.4);
          icon.disableInteractive();
        }
      );
      return;
    }

    if (gameState.bank < item.price) {
      this.showDialogue([`Not enough money to buy ${item.name}.`]);
      return;
    }

    gameState.bank -= item.price;
    this.bankText.setText(`Bank: $${gameState.bank}`);

    // Add to inventory
    gameState.addToInventory(item);

    gameState.currentDeptList.splice(index, 1);
    this.drawDeptList();

    this.characterDisplay.updateBars();

    // Update health/happiness based on item type
    if (item.key === "duck" || item.key == "ducktopus") {
      gameState.updateStat("pet", "happiness", 15);
    } else if (gameState.isNeed(item.key)) {
      gameState.updateStat("character", "health", 5);
    } else if (gameState.isWant(item.key)) {
      gameState.updateStat("character", "happiness", 10);
      gameState.updateStat("character", "health", -3);  // Unhealthy treats
    }

    icon.setAlpha(0.4);
    icon.disableInteractive();
  }
  // Confirmation dialogue with Yes/No (copied and adapted from GroceryScene)
  showConfirmDialogue(messages, onYes) {
    this.confirmDialogueOpen = true;
    this.dialogueMessages = messages;
    this.dialogueIndex = 0;

    const centerX = this.cameras.main.centerX;
    const centerY = this.cameras.main.height - 200;

    this.dialogueBox = this.add.rectangle(centerX, centerY, 900, 220, 0x000000, 0.8);
    this.dialogueBox.setStrokeStyle(2, 0xffffff);

    this.dialogueText = this.add.text(centerX - 430, centerY - 100, "", {
      fontSize: "24px",
      color: "#ffffff",
      wordWrap: { width: 860 },
    });

    // Yes/No buttons
    this.yesButton = this.add.text(centerX + 200, centerY + 60, "Yes", {
      fontSize: "24px",
      color: "#fff",
      backgroundColor: "#228B22"
    }).setInteractive();
    this.noButton = this.add.text(centerX + 300, centerY + 60, "No", {
      fontSize: "24px",
      color: "#fff",
      backgroundColor: "#B22222"
    }).setInteractive();

    this.yesButton.on("pointerdown", () => {
      this.dialogueBox.destroy();
      this.dialogueText.destroy();
      this.yesButton.destroy();
      this.noButton.destroy();
      this.confirmDialogueOpen = false;
      onYes();
    });
    this.noButton.on("pointerdown", () => {
      this.dialogueBox.destroy();
      this.dialogueText.destroy();
      this.yesButton.destroy();
      this.noButton.destroy();
      this.confirmDialogueOpen = false;
    });

    this.dialogueText.setText(this.dialogueMessages.join("\n"));
  }

  // Simple dialogue popup for errors
  showDialogue(messages) {
    this.dialogueMessages = messages;
    this.dialogueIndex = 0;

    const centerX = this.cameras.main.centerX;
    const centerY = this.cameras.main.height - 180;

    this.dialogueBox = this.add.rectangle(centerX, centerY, 900, 220, 0x000000, 0.8);
    this.dialogueBox.setStrokeStyle(2, 0xffffff);

    this.dialogueText = this.add.text(centerX - 430, centerY - 70, "", {
      fontSize: "24px",
      color: "#ffffff",
      wordWrap: { width: 860 },
    });

    this.nextButton = this.add.text(centerX + 360, centerY + 60, "Next", {
      fontSize: "24px",
      color: "#fff",
      backgroundColor: "#333"
    }).setInteractive();

    this.nextButton.on("pointerdown", () => {
      this.dialogueBox.destroy();
      this.dialogueText.destroy();
      this.nextButton.destroy();
    });

    this.dialogueText.setText(this.dialogueMessages.join("\n"));
  }

  generateDeptList(items) {
    return items.slice().sort(() => 0.5 - Math.random()).slice(0, 6)
  }

  drawDeptList() {
    if (this.deptTexts) {
      this.deptTexts.forEach(t => t.destroy())
    }
    this.deptTexts = []

    const x = this.cameras.main.width - 20
    const y = 20

    this.deptTexts.push(
      this.add.text(x, y, "Department List", {
        fontSize: "24px",
        color: "#000000",
        backgroundColor: "#ffffff"
      }).setOrigin(1, 0)
    )

    gameState.currentDeptList.forEach((item, index) => {
      // Use gameState helper to check need vs want
      const color = gameState.isNeed(item.key) ? "#ff0000" : "#b000ff"

      this.deptTexts.push(
        this.add.text(
          x,
          y + 40 + index * 30,
          `${item.name} - $${item.price}`,
          { fontSize: "20px", color, backgroundColor: "#ffffff" }
        ).setOrigin(1, 0)
      )
    })
  }
}
