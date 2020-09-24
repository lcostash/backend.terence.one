import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import {
  IsInt,
  IsDate,
  IsDefined,
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

@Entity()
export class Message {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @IsDefined()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @IsDefined()
  @IsEmail()
  @MinLength(6)
  @MaxLength(100)
  @Column({ type: 'varchar', length: 100 })
  email: string;

  @IsDefined()
  @IsString()
  @MinLength(6)
  @MaxLength(255)
  @Column({ type: 'varchar', length: 255 })
  message: string;

  @IsDefined()
  @IsInt()
  @Column({ type: 'smallint', unsigned: true })
  subscribed: number;

  @IsOptional()
  @IsDate()
  @Column({ type: 'datetime' })
  createdAt: Date;
}
