import Phaser from "phaser"
import { MainMenu } from "./scenes/MainMenu.js"
import { CharacterSelect } from "./scenes/CharacterSelect.js"
import { GameScene } from "./scenes/GameScene.js"
import { ClinicScene } from "./scenes/ClinicScene.js"
import { DepartmentStoreScene } from "./scenes/DepartmentStoreScene.js"
import { HomeScene } from "./scenes/HomeScene.js"
import { GroceryScene } from "./scenes/GroceryScene.js"
import { BankScene } from "./scenes/BankScene.js"
<<<<<<< HEAD
import { TownScene } from "./scenes/TownScene.js"
=======
>>>>>>> main

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
<<<<<<< HEAD
  scene: [MainMenu, CharacterSelect, GameScene, TownScene, HomeScene, GroceryScene, DepartmentStoreScene, ClinicScene, BankScene],
=======
  scene: [MainMenu, CharacterSelect, GameScene, HomeScene, GroceryScene, DepartmentStoreScene, ClinicScene, BankScene],
>>>>>>> main
}

new Phaser.Game(config)

