import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'google sheet api' })
@ObjectType()
export class GoogleSheetApiEntity {
  @Field(() => Number, { description: 'id google sheet api' })
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;
}
