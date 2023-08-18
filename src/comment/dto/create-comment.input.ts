import { InputType, Int, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CommentEntity } from '../entities/comment.entity';

@InputType()
export class CreateCommentInput {

  @Field(() => String, {nullable: false})
  @IsNotEmpty()
  @IsString({message: 'sdsdas'})
  content: string;

  @Field(() => Int, {nullable: false})
  @IsNotEmpty()
  @IsNumber()
  postId?: number;
}
