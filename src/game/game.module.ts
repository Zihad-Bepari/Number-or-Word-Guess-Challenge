import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { WordGameService } from './word-game.service';

@Module({
  controllers: [GameController],
  providers: [GameService,WordGameService],
})
export class GameModule {}
