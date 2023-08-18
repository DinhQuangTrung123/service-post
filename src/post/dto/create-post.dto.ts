import { InputType, Field, Int } from '@nestjs/graphql';
import { IsString, IsEmpty, IsNumber, Validate, IsEmail } from 'class-validator';

@InputType()
export class CreatePostDto {
  @Field()
  // @IsEmail()
  @IsString({message:"Is must be string not number"})
  name: string;

  // @Field(()=>Int, {nullable: true})
  // @IsEmpty()
  // @IsNumber()
  // commentId?: number;
}
