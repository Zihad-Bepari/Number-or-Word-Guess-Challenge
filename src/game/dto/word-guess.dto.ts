import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class WordGuessDto {
  @ApiProperty({
    example: 'CAT',
    description: 'Player submitted word guess',
  })
  @IsString()
  @MinLength(1)
  guess: string;
}
