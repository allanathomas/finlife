import Phaser from "phaser"

export class GroceryScene extends Phaser.Scene {
  constructor() {
    super("GroceryScene")
  }

  preload() {
    this.load.image("shelf", "resources/grocery shelf.png")

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

    // 💰 INITIAL BANK AMOUNT
    this.bankAmount = 2000
    this.scene.get("BankScene")?.updateBank(this.bankAmount)

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

    // 📝 SAVE grocery list on scene
    this.groceryList = this.generateGroceryList(this.items)
    this.drawGroceryList()

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

      icon.on("pointerdown", () => this.buyItem(item, icon))
    })
  }

  buyItem(item, icon) {
    const index = this.groceryList.findIndex(i => i.key === item.key)
    if (index === -1) return

    if (this.bankAmount < item.price) return

    this.bankAmount -= item.price
    this.scene.get("BankScene")?.updateBank(this.bankAmount)

    this.groceryList.splice(index, 1)
    this.drawGroceryList()

    icon.setAlpha(0.4)
    icon.disableInteractive()
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

    this.groceryList.forEach((item, index) => {
      const isNeed = this.items.findIndex(i => i.key === item.key) < 8
      const color = isNeed ? "#ff0000" : "#b000ff"

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
