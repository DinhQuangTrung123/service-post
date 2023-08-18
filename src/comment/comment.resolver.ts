import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
  Subscription,
} from '@nestjs/graphql';
import { CommentService } from './comment.service';
import { CommentEntity } from './entities/comment.entity';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { PostEntity } from 'src/post/entities/post.entity';
import { PubSub } from 'graphql-subscriptions';
import { log } from 'console';

@Resolver(() => CommentEntity)
export class CommentResolver {
  private pubSub: PubSub;
  constructor(
    private readonly commentService: CommentService, // @Inject('PUB_SUB') private readonly pubSub: PubSub,
  ) {
    this.pubSub = new PubSub();
  }

  // @Mutation(() => CommentEntity)
  // //: Promise<CommentEntity>
  // createComment(@Args('createCommentInput') createCommentInput: CreateCommentInput){
  //   return this.commentService.create(createCommentInput);
  // }

  // @Subscription((returns) => CommentEntity)
  @Mutation(() => CommentEntity)
  async createComment(
    @Args('createCommentInput') createCommentInput: CreateCommentInput,
  ) {
    const result = await this.commentService.create(createCommentInput);
    log(result);
    await this.pubSub.publish('commentAdded', {
      commentAdded: result,
    });

    // UserInputError
    return result;
  }

  // {
  //   // filter:(payload, variable) => payload.result.content === variable.content
  // }

  @Subscription(() => CommentEntity, {
    name: 'commentAdded',
  })
  createCommentMessage() {
    return this.pubSub.asyncIterator('commentAdded');
  }

  // @Subscription(() => CommentEntity,{
  //   name: 'commentAdded1',
  // })
  //  createCommentMessage(){
  //  return this.pubSub.asyncIterator('commentAdded');

  // }

  @Query(() => [CommentEntity])
  getComments(): Promise<CommentEntity[]> {
    return this.commentService.findAll();
  }

  // { name: 'comment' }
  @Query(() => CommentEntity)
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.commentService.findOne(id);
  }

  @Mutation(() => CommentEntity)
  updateComment(
    @Args('updateCommentInput') updateCommentInput: UpdateCommentInput,
  ) {
    return this.commentService.update(
      updateCommentInput.id,
      updateCommentInput,
    );
  }

  @ResolveField(() => PostEntity)
  // Promise<PostEntity>
  async post(@Parent() comment: CommentEntity): Promise<PostEntity> {
    return this.commentService.getComment(comment.postId);
  }

  @Mutation(() => CommentEntity)
  removeComment(@Args('id', { type: () => Int }) id: number) {
    return this.commentService.remove(id);
  }
}
