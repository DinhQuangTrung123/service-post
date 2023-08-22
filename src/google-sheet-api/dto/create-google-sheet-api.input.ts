import { InputType, Field, PartialType } from '@nestjs/graphql';
// import { PartialType } from '@nestjs/mapped-types';
import { IsIn, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateGoogleSheetApiInput {
  @Field(() => String, { nullable: true })
  @IsNotEmpty()
  @IsString({ message: 'name file' })
  name: string;
}

@InputType()
export class AddRowGoogleSheetApiInput {
  @Field(() => String, { nullable: true })
  @IsNotEmpty()
  @IsString({ message: 'name file' })
  email: string;

  @Field(() => String, { nullable: true })
  @IsNotEmpty()
  @IsString({ message: 'username file' })
  username: string;

  @Field(() => String, { nullable: true })
  @IsNotEmpty()
  @IsString({ message: 'password file' })
  password: string;
}

@InputType()
export class DeleteRowGoogleSheetApiInput {
  @Field(() => String, { nullable: true })
  @IsNotEmpty()
  @IsString({ message: 'name file' })
  @IsIn(['Email', 'Username', 'Password', 'Date'], {
    message: 'Invalid column value',
  })
  columnName: string;

  @Field(() => String, { nullable: true })
  @IsNotEmpty()
  @IsString({ message: 'username file' })
  value: string;
}

@InputType()
export class UpdateRowGoogleSheetApiInput extends PartialType(
  AddRowGoogleSheetApiInput,
) {
  @Field(() => String, { nullable: true })
  @IsNotEmpty()
  @IsString({ message: 'name file' })
  @IsIn(['Email', 'Username', 'Password', 'Date'], {
    message: 'Invalid column value',
  })
  columnName: string;
}
