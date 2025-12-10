import { Controller, Post, Body, Get } from '@nestjs/common';
import { GameService } from './game.service';
import { GuessNumberDto } from './dto/guess-number.dto';
import { WordGameService } from './word-game.service';
import { WordGuessDto } from './dto/word-guess.dto';

@Controller('game')
export class GameController {
  constructor(
    private readonly gameService: GameService,
    private readonly wordGameService: WordGameService,
  ) {}

  // ---------------- Number Guessing Game ----------------
    @Post('number/guess')
    guessNumber(@Body() body: GuessNumberDto) {
      const { guess, playerName, difficulty } = body;
      const message = this.gameService.guessNumber(guess);
      return { message, playerName, difficulty };
    }

  // ---------------- Word Game ----------------
    @Get('word/chars')
    getShuffledChars() {
      return this.wordGameService.getShuffledChars();
    }

    @Post('guess')
    guessWord(@Body() body: WordGuessDto) {
      return this.wordGameService.guessWord(body.guess);
    }
}
