import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class ProjectcomponentCreateDto {
  @IsString()
  @IsOptional()
  projectId?: string

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

export class ProjectcomponentUpdateDto {
  @IsString()
  @IsOptional()
  projectId?: string

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
