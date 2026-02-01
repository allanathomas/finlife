export const gameState = {
  // Character
  character: {
    type: null,      // "A" (girl) or "B" (boy)
    health: 100,
    happiness: 100,
  },

  // Pet
  pet: {
    type: "Dog",
    health: 100,
    happiness: 100,
  },

  // Financial
  bank: 0,
  piggyBalance: 48,
  salary: 200,

  // time
  week: -1,

  // ===== LISTS =====

  // Current shopping list (generated per scene visit)
  currentGroceryList: [],
  currentDeptList: [],

  // Inventory of purchased items
  inventory: [],

  // Define what counts as needed items (everything else is not needed)
  needItems: ["dogfood", "cheese", "eggs", "apple", "bread", "carrot", "potato", "milk", "bandages", "batteries", "lotion", "pan", "detergent", "sanitizer", "soap", "bulb", "toiletpaper"],

  // Track completed tasks/objectives
  completedTasks: [],

  // Bills/expenses that must be paid
  bills: [
    { name: "Rent", amount: 500, due: false },
    { name: "Utilities", amount: 100, due: false },
  ],

  // ===== HELPER METHODS =====

  isNeed(itemKey) {
    return this.needItems.includes(itemKey)
  },

  addToInventory(item) {
    this.inventory.push(item)
  },

  hasItem(itemKey) {
    return this.inventory.some(i => i.key === itemKey)
  },

  updateStat(entity, stat, amount) {
    this[entity][stat] = Math.max(0, Math.min(100, this[entity][stat] + amount))
  },

  // Reset game to initial state
  reset() {
    this.character.type = null
    this.character.health = 100
    this.character.happiness = 100
    this.pet.health = 100
    this.pet.happiness = 100
    this.bank = 200
    this.piggyBalance = 50
    this.week = 0
    this.inventory = []
    this.currentGroceryList = []
    this.completedTasks = []
    this.bills.forEach(b => b.due = false)
  },
}
