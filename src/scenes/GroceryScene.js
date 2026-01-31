import Phaser from "phaser"

export class GroceryScene extends Phaser.Scene {
  constructor() {
    super("GroceryScene")
  }

  preload() {
    // Background
    this.load.image("shelf", "resources/grocery shelf.png")

    // Items
    this.load.image("soup", "resources/icons/canned_soup.png")
    this.load.image("cheese", "resources/icons/cheese_mozzarella.png")
    this.load.image("eggs", "resources/icons/eggs_brown.png")
    this.load.image("apple", "resources/icons/fruit_apple.png")
    this.load.image("bread", "resources/icons/pastry_bread.png")
    this.load.image("carrot", "resources/icons/vegetable_carrot.png")
    this.load.image("potato", "resources/icons/vegetable_potato.png")
    this.load.image("milk", "resources/icons/soymilk_soy.png")
    this.load.image("cake", "resources/icons/cake_chocolate.png")
    this.load.image("boba", "resources/icons/boba_taro.png")
    this.load.image("icecream", "resources/icons/icecream_2scoops.png")
    this.load.image("soda", "resources/icons/soda_coke.png")
  }

  create() {
    const centerX = this.cameras.main.centerX
    const centerY = this.cameras.main.centerY

    // Background
    const bg = this.add.image(centerX, centerY, "shelf")
    bg.setOrigin(0.5)
    bg.setDisplaySize(this.cameras.main.width, this.cameras.main.height)

    // Items data
    const items = [
      { key: "soup", price: 5 },
      { key: "cheese", price: 7 },
      { key: "eggs", price: 4 },
      { key: "apple", price: 2 },
      { key: "bread", price: 6 },
      { key: "carrot", price: 3 },
      { key: "potato", price: 4 },
      { key: "milk", price: 3 },
      { key: "cake", price: 10 },
      { key: "boba", price: 12 },
      { key: "icecream", price: 9 },
      { key: "soda", price: 3 },
    ]

const startX = 200
const startY = 350
const gapX = 220
const gapY = 210

const itemsPerRow = 4

items.forEach((item, index) => {
  const col = index % itemsPerRow
  const row = Math.floor(index / itemsPerRow)

  const x = startX + col * gapX
  const y = startY + row * gapY

  // Item icon
  const icon = this.add.image(x, y, item.key)
    .setInteractive({ useHandCursor: true })
    .setScale(0.8)

  // Price text
  this.add.text(x, y + 70, `$${item.price}`, {
    fontSize: "22px",
    color: "#ffffff",
  }).setOrigin(0.5)

  icon.on("pointerdown", () => {
    console.log(`Bought ${item.key} for $${item.price}`)
  })
})}}
