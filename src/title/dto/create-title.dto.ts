import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateTitleInput {
  @Field(() => String, { nullable: true })
  @IsNotEmpty()
  @IsString({ message: 'sdsdas' })
  name: string;

  //   @Field(() => Int, { nullable: false })
  //   @IsNotEmpty()
  //   @IsNumber()
  //   titleId?: number;
}
