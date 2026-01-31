import Phaser from "phaser"

export class GroceryScene extends Phaser.Scene {
  constructor() {
    super("GroceryScene")
  }

  preload() {
    // Background
    this.load.image("shelf", "resources/grocery shelf.png")

    // Items
    this.load.image("soup", "Icons/canned_soup.png")
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
const startY = 140
const gapX = 270
const gapY = 260

const itemsPerRow = 4

items.forEach((item, index) => {
  const col = index % itemsPerRow
  const row = Math.floor(index / itemsPerRow)

  const x = startX + col * gapX
  const y = startY + row * gapY

  // Item icon
  const icon = this.add.image(x, y, item.key)
    .setInteractive({ useHandCursor: true })
    .setScale(5.5)

  // Price text
  this.add.text(x, y + 70, `$${item.price}`, {
    fontSize: "22px",
    color: "#ffffff",
  }).setOrigin(0.5)

  icon.on("pointerdown", () => {
    console.log(`Bought ${item.key} for $${item.price}`)
  })
})}}
