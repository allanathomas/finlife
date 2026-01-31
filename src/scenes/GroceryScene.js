import Phaser from "phaser"
import { gameState } from "../GameState.js"
import { createCharacterDisplay } from "../CharacterDisplay.js"

export class GroceryScene extends Phaser.Scene {
  constructor() {
    super("GroceryScene")
  }

  preload() {
    this.load.image("shelf", "resources/grocery shelf.png")

    this.load.spritesheet("girl", "resources/girlchar.png", {
      frameWidth: 32,
      frameHeight: 32,
    })
    this.load.spritesheet("boy", "resources/boychar.png", {
      frameWidth: 32,
      frameHeight: 32,
    })

    this.load.image("dogfood", "Icons/canned_soup.png")
    this.load.image("cheese", "Icons/cheese_mozzarella.png")
    this.load.image("eggs", "Icons/eggs_brown.png")
    this.load.image("apple", "Icons/fruit_apple.png")
    this.load.image("bread", "Icons/pastry_bread.png")
    this.load.image("carrot", "Icons/vegetable_carrot.png")
    this.load.image("potato", "Icons/vegetable_potato.png")
    this.load.image("milk", "Icons/soymilk_soy.png")
    this.load.image("cake", "Icons/cake_chocolate.png")
    this.load.image("boba", "Icons/boba_taro.png")
    this.load.image("icecream", "Icons/icecream_2scoops.png")
    this.load.image("soda", "Icons/soda_coke.png")
  }

  create() {
    const { centerX, centerY } = this.cameras.main

    // BANK TEXT (always visible)
    this.bankText = this.add.text(20, 20, `Bank: $${gameState.bank}`, {
      fontSize: "22px",
      color: "#ffffff",
    })

    // Background
    const bg = this.add.image(centerX, centerY, "shelf")
    bg.setDisplaySize(this.cameras.main.width, this.cameras.main.height)

    // Store items
    this.items = [
      { key: "dogfood", name: "Dog Food", price: 5 },
      { key: "cheese", name: "Cheese", price: 7 },
      { key: "eggs", name: "Eggs", price: 4 },
      { key: "apple", name: "Apple", price: 2 },
      { key: "bread", name: "Bread", price: 6 },
      { key: "carrot", name: "Carrot", price: 3 },
      { key: "potato", name: "Potato", price: 4 },
      { key: "milk", name: "Milk", price: 3 },
      { key: "cake", name: "Cake", price: 10 },
      { key: "boba", name: "Boba", price: 12 },
      { key: "icecream", name: "Ice Cream", price: 9 },
      { key: "soda", name: "Soda", price: 3 },
    ]

    // Grocery list - use gameState to persist across scene visits
    if (gameState.currentGroceryList.length === 0) {
      gameState.currentGroceryList = this.generateGroceryList(this.items)
    }
    this.drawGroceryList()

    // Selected character with health/happiness bars - right side, below grocery list
    const screenWidth = this.cameras.main.width
    const screenHeight = this.cameras.main.height
    const listBottomY = 20 + 40 + Math.max(gameState.currentGroceryList.length, 6) * 30 + 20
    const charWidth = screenWidth / 3
    const charHeight = screenHeight / 2
    const charX = screenWidth - 20 - charWidth / 2
    const charY = listBottomY + charHeight / 2 + 40

    this.characterDisplay = createCharacterDisplay(this, {
      x: charX,
      y: charY,
      width: charWidth,
      height: charHeight,
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

    this.add.text(400, 400, "Next", { fontSize: "24px", color: "#fff" })
      .setInteractive()
      .on("pointerdown", () => {
      this.scene.start("DepartmentStoreScene")
    })
  }

  // BUY ITEM FUNCTION
  buyItem(item, icon) {
    const index = gameState.currentGroceryList.findIndex(i => i.key === item.key);
    // If not on grocery list, ask for confirmation
    if (index === -1) {
      if (gameState.bank < item.price) {
        this.showDialogue([`Not enough money to buy ${item.name}.`]);
        return;
      }
      const left = gameState.bank - item.price;
      this.showConfirmDialogue(
        [`${item.name} is not on your grocery list.`,
         `Do you really want to buy it for $${item.price}?`,
         `You will have $${left} left in your bank.`],
        () => {
          // Yes: proceed with purchase
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

    // Remove from grocery list
    gameState.currentGroceryList.splice(index, 1);
    this.drawGroceryList();

    // Update health/happiness based on item type
    if (item.key === "dogfood") {
      gameState.updateStat("pet", "health", 10);
      gameState.updateStat("pet", "happiness", 5);
    } else if (gameState.isNeed(item.key)) {
      gameState.updateStat("character", "health", 5);
    } else if (gameState.isWant(item.key)) {
      gameState.updateStat("character", "happiness", 10);
      gameState.updateStat("character", "health", -3);  // Unhealthy treats
    }

    this.characterDisplay.updateBars();

    icon.setAlpha(0.4);
    icon.disableInteractive();
  }

  // Confirmation dialogue with Yes/No
  showConfirmDialogue(messages, onYes) {
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
      onYes();
    });
    this.noButton.on("pointerdown", () => {
      this.dialogueBox.destroy();
      this.dialogueText.destroy();
      this.yesButton.destroy();
      this.noButton.destroy();
    });

    this.dialogueText.setText(this.dialogueMessages.join("\n"));
  }

  // Dialogue popup similar to GameScene
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
      this.nextDialogue();
    });

    this.nextDialogue();
  }

  nextDialogue() {
    if (!this.dialogueMessages) return;

    if (this.dialogueIndex >= this.dialogueMessages.length) {
      this.dialogueBox.destroy();
      this.dialogueText.destroy();
      this.nextButton.destroy();
      return;
    }

    this.dialogueText.setText(this.dialogueMessages[this.dialogueIndex]);
    this.dialogueIndex++;
  }

  generateGroceryList(items) {
    return items.slice().sort(() => 0.5 - Math.random()).slice(0, 6)
  }

  drawGroceryList() {
    if (this.groceryTexts) {
      this.groceryTexts.forEach(t => t.destroy())
    }
    this.groceryTexts = []

    const x = this.cameras.main.width - 20
    const y = 20

    this.groceryTexts.push(
      this.add.text(x, y, "Grocery List", {
        fontSize: "24px",
        color: "#000000",
        backgroundColor: "#ffffff"
      }).setOrigin(1, 0)
    )

    gameState.currentGroceryList.forEach((item, index) => {
      // Use gameState helper to check need vs want
      const color = gameState.isNeed(item.key) ? "#ff0000" : "#b000ff"

      this.groceryTexts.push(
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
