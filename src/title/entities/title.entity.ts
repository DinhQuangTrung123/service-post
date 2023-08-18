import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Title' })
@ObjectType()
export class TitleEntity {
  @Field(() => Number)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ type: 'int', default: 1 })
  version?: number;

  @Field()
  @Column({ type: 'int', default: 1 })
  status?: number;
}
