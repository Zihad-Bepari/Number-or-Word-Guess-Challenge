export class Game {
  targetNumber: number;
  attempts: number;

  constructor() {
    this.targetNumber = Math.floor(Math.random() * 1000) + 1; // 1-100
    this.attempts = 0;
  }
}
