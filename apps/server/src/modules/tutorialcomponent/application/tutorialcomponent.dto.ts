import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class TutorialcomponentCreateDto {
  @IsString()
  @IsOptional()
  tutorialId?: string

  @IsString()
  @IsOptional()
  componentId?: string

  @IsString()
  @IsOptional()
  dateCreated?: string

  @IsString()
  @IsOptional()
  dateDeleted?: string

  @IsString()
  @IsOptional()
  dateUpdated?: string
}

export class TutorialcomponentUpdateDto {
  @IsString()
  @IsOptional()
  tutorialId?: string

  @IsString()
  @IsOptional()
  componentId?: string

  @IsString()
  @IsOptional()
  dateCreated?: string

  @IsString()
  @IsOptional()
  dateDeleted?: string

  @IsString()
  @IsOptional()
  dateUpdated?: string
}
