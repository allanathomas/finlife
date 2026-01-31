import Phaser from "phaser"

// Adjust frameWidth, frameHeight, and end frame to match your spritesheet layout
const FRAME_WIDTH = 32
const FRAME_HEIGHT = 32
const FRAME_COUNT = 4 // frames 0-3 (adjust if your spritesheet has more/fewer)

export class CharacterSelect extends Phaser.Scene {
  constructor() {
    super("CharacterSelect")
  }

  /**
   * Load the assets (images, sounds, etc.)
   */
  preload() {
    this.load.spritesheet("girl", "/resources/girlchar.png", {
      frameWidth: FRAME_WIDTH,
      frameHeight: FRAME_HEIGHT,
    })
    this.load.spritesheet("boy", "/resources/boychar.png", {
      frameWidth: FRAME_WIDTH,
      frameHeight: FRAME_HEIGHT,
    })
  }

  /**
   * Create the scene (add sprites, buttons, etc.)
   */
  create() {
    // Girl animation
    this.anims.create({
      key: "girlIdle",
      frames: this.anims.generateFrameNumbers("girl", { start: 0, end: FRAME_COUNT - 1 }),
      frameRate: 8,
      repeat: -1,
    })
    // Boy animation
    this.anims.create({
      key: "boyIdle",
      frames: this.anims.generateFrameNumbers("boy", { start: 0, end: FRAME_COUNT - 1 }),
      frameRate: 8,
      repeat: -1,
    })

    this.add.text(400, 50, "Choose your character", {
      fontSize: "32px",
      color: "#ffffff",
    }).setOrigin(0.5)

    // Character A - Girl (left) - click to select
    const girlSprite = this.add.sprite(250, 180, "girl")
    girlSprite.setDisplaySize(120, 120)
    girlSprite.play("girlIdle")
    girlSprite.setInteractive({ useHandCursor: true })
    girlSprite.on("pointerdown", () => {
      this.selectCharacter(girlSprite, "A")
    })

    // Character B - Boy (right) - click to select
    const boySprite = this.add.sprite(550, 180, "boy")
    boySprite.setDisplaySize(120, 120)
    boySprite.play("boyIdle")
    boySprite.setInteractive({ useHandCursor: true })
    boySprite.on("pointerdown", () => {
      this.selectCharacter(boySprite, "B")
    })

    // Next button - bottom right
    this.selectedCharacter = null
    const nextX = this.cameras.main.width - 100
    const nextY = this.cameras.main.height - 80
    const nextButton = this.add.text(nextX, nextY, "Next", {
      fontSize: "32px",
      color: "#ffffff",
      backgroundColor: "#2196f3",
      padding: { x: 24, y: 12 },
    }).setOrigin(0.5)

    nextButton.setInteractive({ useHandCursor: true })
    nextButton.on("pointerdown", () => {
      if (this.selectedCharacter) {
        this.scene.start("GameScene", { character: this.selectedCharacter })
      }
    })
  }

  selectCharacter(selectedSprite, character) {
    this.selectedCharacter = character

    // Clear previous highlight
    if (this.selectionHighlight) {
      this.selectionHighlight.destroy()
    }

    // Draw highlight frame around selected character
    const pad = 8
    const w = 120 + pad * 2
    const h = 120 + pad * 2
    const x = selectedSprite.x - w / 2
    const y = selectedSprite.y - h / 2

    this.selectionHighlight = this.add.graphics()
    this.selectionHighlight.lineStyle(4, 0x4caf50)
    this.selectionHighlight.strokeRect(x, y, w, h)
    this.selectionHighlight.setDepth(10)
  }
}