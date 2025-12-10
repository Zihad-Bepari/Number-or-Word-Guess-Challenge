import { IsInt, Min, Max, IsString, IsOptional, IsIn } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class GuessNumberDto {
  @ApiProperty({
    description: 'The number you want to guess',
    minimum: 1,
    maximum: 1000,
    example: 0,
  })
  @IsInt()
  @Min(1)
  @Max(1000)
  guess: number;

  @ApiProperty({
    description: 'Name of the player',
    example: 'Alice',
  })
  @IsString()
  playerName: string;

  @ApiPropertyOptional({
    description: 'Difficulty level of the game',
    enum: ['easy', 'medium', 'hard'],
    example: 'medium',
  })
  @IsOptional()
  @IsIn(['easy', 'medium', 'hard'])
  difficulty?: string;
}
