import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class FileCreateDto {
  @IsString()
  @IsOptional()
  fileName?: string

  @IsString()
  @IsOptional()
  fileType?: string

  @IsString()
  @IsOptional()
  filePathUrl?: string

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

export class FileUpdateDto {
  @IsString()
  @IsOptional()
  fileName?: string

  @IsString()
  @IsOptional()
  fileType?: string

  @IsString()
  @IsOptional()
  filePathUrl?: string

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
