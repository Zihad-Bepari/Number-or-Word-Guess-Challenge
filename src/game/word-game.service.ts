import { Injectable } from '@nestjs/common';

@Injectable()
export class WordGameService {
  private targetWord: string = ''; 
  private shuffledChars: string[] = []; 
  private attempts: number = 0;
  private maxAttempts: number = 10;
  private previousGuesses: string[] = [];

  private charPool: string[] = [
    'A','B','C','D','E','F','G','H','I','J','K','L','M',
    'N','O','P','Q','R','S','T','U','V','W','X','Y','Z'
  ];

  constructor() {
    this.resetGame();
  }

  getShuffledChars(): string[] {
    return this.shuffledChars;
  }

  guessWord(guess: string): { message: string; chars: string[] } {
    this.attempts++;
    guess = guess.toUpperCase();

    // Check for repeated guess
    if (this.previousGuesses.includes(guess)) {
      return { message: 'You already guessed that word! 😅', chars: this.shuffledChars };
    }
    this.previousGuesses.push(guess);

    // Check correct guess
    if (guess === this.targetWord) {
      const attempts = this.attempts;
      this.resetGame();
      return {
        message: `🎉 Correct! You guessed "${guess}" in ${attempts} attempts. New game started! 🤗`,
        chars: this.shuffledChars
      };
    }

    // Check max attempts
    if (this.attempts >= this.maxAttempts) {
      const word = this.targetWord;
      this.resetGame();
      return {
        message: `❌ Game over! The word was "${word}". New game started.`,
        chars: this.shuffledChars
      };
    }

    // Hint system: correct positions & letters
    let correctPositions = 0;
    let correctLetters = 0;
    const targetArr = this.targetWord.split('');
    const guessArr = guess.split('');

    for (let i = 0; i < Math.min(targetArr.length, guessArr.length); i++) {
      if (guessArr[i] === targetArr[i]) correctPositions++;
    }

    for (const char of guessArr) {
      if (targetArr.includes(char)) correctLetters++;
    }

    return {
      message: `Not quite! Letters in correct positions: ${correctPositions}, correct letters (any position): ${correctLetters}. Try again!`,
      chars: this.shuffledChars
    };
  }

  private resetGame() {
    this.targetWord = this.generateRandomWord();
    this.shuffledChars = this.shuffleWord(this.targetWord);
    this.attempts = 0;
    this.previousGuesses = [];
      console.log('🎯 New target word:', this.targetWord); // <-- DEBUG HERE

}

  private generateRandomWord(): string {
    const length = Math.floor(Math.random() * 4) + 3; // 3-6 letters
    const shuffledPool = [...this.charPool].sort(() => Math.random() - 0.5);
    return shuffledPool.slice(0, length).join('');
  }

  private shuffleWord(word: string): string[] {
    const arr = word.split('');
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

}
