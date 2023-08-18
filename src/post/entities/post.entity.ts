import { ObjectType, Field, Int } from '@nestjs/graphql';
import { CommentEntity } from 'src/comment/entities/comment.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity({ name: 'Post' })
@ObjectType()
export class PostEntity {
  @Field(() => Number)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  // @Column({ nullable: true })
  // @Field(()=>Int, {nullable: true})
  // commentId?: number;

  @OneToMany(() => CommentEntity, (comment) => comment.content)
  @Field(() => [CommentEntity], { nullable: true })
  contents?: CommentEntity[];
}
