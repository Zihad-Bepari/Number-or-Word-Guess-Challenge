import { Injectable } from '@nestjs/common';
import { Game } from './entities/game.entity';

@Injectable()
export class GameService {
  private game: Game = new Game();

  guessNumber(guess: number): string {
  this.game.attempts++;

      const diff = Math.abs(guess - this.game.targetNumber);

      if (diff === 0) {
        const attempts = this.game.attempts;
        this.game = new Game();
        return `Correct! 🥰 You guessed it in ${attempts} attempts. New game started. 🤗`;
      }

      if (diff <= 5) {
        return 'Very close! 🔥 Try again 🙂';
      }

      if (guess < this.game.targetNumber) return 'Too low! try again 🙂';
      if (guess > this.game.targetNumber) return 'Too high! try again 🙂';

      return ''; 
    }

}
