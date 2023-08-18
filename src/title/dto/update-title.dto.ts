import { PartialType } from '@nestjs/mapped-types';
import { CreateTitleInput } from './create-title.dto';
import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class UpdateTitleDto extends PartialType(CreateTitleInput) {
  @Field(() => String, { nullable: true })
  @IsNotEmpty()
  @IsString({ message: 'sdsdas' })
  name: string;

  @Field(() => Int, { nullable: false })
  @IsNotEmpty()
  @IsNumber()
  titleId?: number;
}

// @InputType()
// export class UpdateTitleDto {
//   @Field(() => String, { nullable: false })
//   @IsNotEmpty()
//   @IsString({ message: 'sdsdas' })
//   name: string;

//   @Field(() => Int, { nullable: false })
//   @IsNotEmpty()
//   @IsNumber()
//   titleId?: number;
// }
