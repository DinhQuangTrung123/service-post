import { ObjectType, Field, Int } from '@nestjs/graphql';
import { PostEntity } from 'src/post/entities/post.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'Comment' })
@ObjectType()
export class CommentEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Number)
  id: number;

  @Column()
  @Field(() => String)
  content: string;

  @Column({ nullable: true })
  @Field(() => Int)
  postId?: number;

  @ManyToOne(() => PostEntity, (post) => post.contents, { nullable: true })
  @Field(() => PostEntity, { nullable: true })
  post?: PostEntity;
}
