import Phaser from "phaser"
import { MainMenu } from "./scenes/MainMenu.js"
import { CharacterSelect } from "./scenes/CharacterSelect.js"
import { GameScene } from "./scenes/GameScene.js"

const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  parent: "game-container",
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  backgroundColor: "#1d1d1d",
  scene: [MainMenu, CharacterSelect, GameScene],
}

new Phaser.Game(config)