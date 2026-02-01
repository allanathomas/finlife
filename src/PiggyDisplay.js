import { gameState } from "./GameState.js"

/**
 * Adds the piggy bank display with balance text. Piggy is clickable and shows
 * Invest/Withdraw options popup when clicked.
 *
 * @param {Phaser.Scene} scene - The Phaser scene to add the display to
 * @param {Object} options - Position options
 * @param {number} [options.x=300] - X position of piggy (center)
 * @param {number} [options.y=0] - Y position of piggy (top at y=0)
 * @param {number} [options.balanceTextX=350] - X position of balance text
 * @param {number} [options.balanceTextY=40] - Y position of balance text
 * @param {() => void} [options.onBalanceChange] - Called when balance changes (e.g. to update scene bankText)
 * @returns {{ image: Phaser.GameObjects.Image, balanceText: Phaser.GameObjects.Text, updateBalance: () => void, destroy: () => void }}
 */
export function createPiggyDisplay(scene, options = {}) {
  const x = options.x ?? 300
  const y = options.y ?? 0
  const balanceTextX = options.balanceTextX ?? 350
  const balanceTextY = options.balanceTextY ?? 40
  const onBalanceChange = options.onBalanceChange

  const piggyImg = scene.add.image(x, y, "piggy")
    .setOrigin(0.5, 0)
    .setScale(0.3)
    .setInteractive({ useHandCursor: true })

  piggyImg.on("pointerdown", () => {
    showPiggyOptions(scene, updateBalance, onBalanceChange)
  })

  const balanceText = scene.add.text(balanceTextX, balanceTextY, `: $${gameState.piggyBalance ?? 0}`, {
    fontSize: "26px",
    color: "#000000",
  })

  function updateBalance() {
    balanceText.setText(`: $${gameState.piggyBalance ?? 0}`)
  }

  return {
    image: piggyImg,
    balanceText,
    updateBalance,
    destroy() {
      piggyImg.destroy()
      balanceText.destroy()
    },
  }
}

function showPiggyOptions(scene, updateBalance, onBalanceChange) {
  const boxX = 350
  const boxY = 200
  const boxWidth = 450
  const boxHeight = 150

  const dialogueBox = scene.add.rectangle(boxX, boxY, boxWidth, boxHeight, 0x000000, 0.85)
  dialogueBox.setStrokeStyle(2, 0xffffff)

  const dialogueText = scene.add.text(boxX, boxY - 35, "+$2 every week when you invest 🐷", {
    fontSize: "20px",
    color: "#ffffff",
  }).setOrigin(0.5)

  const investBtn = scene.add.text(boxX - 80, boxY + 25, "Invest", {
    fontSize: "20px",
    color: "#fff",
    backgroundColor: "#228B22",
    padding: { left: 20, right: 20, top: 8, bottom: 8 },
  }).setOrigin(0.5).setInteractive()
  const withdrawBtn = scene.add.text(boxX + 80, boxY + 25, "Withdraw", {
    fontSize: "20px",
    color: "#fff",
    backgroundColor: "#B22222",
    padding: { left: 20, right: 20, top: 8, bottom: 8 },
  }).setOrigin(0.5).setInteractive()

  const closePopup = () => {
    dialogueBox.destroy()
    dialogueText.destroy()
    investBtn.destroy()
    withdrawBtn.destroy()
  }

  investBtn.on("pointerdown", () => {
    // Invest: move 5 from bank → piggy (put money in piggy)
    if (gameState.bank >= 5) {
      gameState.bank -= 5
      gameState.piggyBalance = (gameState.piggyBalance ?? 0) + 5
      updateBalance?.()
      onBalanceChange?.()
    }
    closePopup()
  })
  withdrawBtn.on("pointerdown", () => {
    // Withdraw: move 5 from piggy → bank (take money from piggy)
    if ((gameState.piggyBalance ?? 0) >= 5) {
      gameState.piggyBalance = (gameState.piggyBalance ?? 0) - 5
      gameState.bank += 5
      updateBalance?.()
      onBalanceChange?.()
    }
    closePopup()
  })
}
