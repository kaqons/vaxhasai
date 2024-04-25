import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class CodesnippetCreateDto {
  @IsString()
  @IsOptional()
  codeContent?: string

  @IsString()
  @IsOptional()
  projectId?: string

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

export class CodesnippetUpdateDto {
  @IsString()
  @IsOptional()
  codeContent?: string

  @IsString()
  @IsOptional()
  projectId?: string

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
