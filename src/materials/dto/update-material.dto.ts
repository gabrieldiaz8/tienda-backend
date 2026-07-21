import { IsString, IsOptional, IsBoolean, IsNumber } from 'class-validator';

export class UpdateMaterialDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsBoolean()
  activo?: boolean;

  @IsOptional()
  @IsNumber()
  orden?: number;
}
