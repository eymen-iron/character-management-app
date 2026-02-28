import { InputType, Field } from '@nestjs/graphql';
import {
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  Matches,
  ArrayMaxSize,
} from 'class-validator';
import { Status, Gender } from '../models/character.model';

@InputType()
export class CharacterFilterInput {
  @Field(() => [Status], { nullable: true })
  @IsOptional()
  @IsEnum(Status, { each: true, message: 'Invalid status value' })
  @ArrayMaxSize(3, { message: 'Cannot select more than 3 statuses' })
  status?: Status[];

  @Field(() => [Gender], { nullable: true })
  @IsOptional()
  @IsEnum(Gender, { each: true, message: 'Invalid gender value' })
  @ArrayMaxSize(3, { message: 'Cannot select more than 3 genders' })
  gender?: Gender[];

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(50, { message: 'Search query cannot exceed 50 characters' })
  @Matches(/^[a-zA-Z0-9\s\-'.]+$/, {
    message: 'Search contains invalid characters',
  })
  search?: string;
}
