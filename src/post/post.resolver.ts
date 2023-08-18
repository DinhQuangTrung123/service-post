import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { PostService } from './post.service';
import { PostEntity } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { CommentEntity } from '../comment/entities/comment.entity';

@Resolver(() => PostEntity)
export class PostResolvers {
  constructor(private readonly postService: PostService) {}

  @Query(() => PostEntity)
  async getPost(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<PostEntity> {
    return await this.postService.findOne(id);
  }

  @Query(() => [PostEntity])
  async getPosts(): Promise<PostEntity[]> {
    return await this.postService.findAll();
  }

  @ResolveField(() => [CommentEntity])
  async contents(@Parent() post: PostEntity): Promise<CommentEntity[]> {
    return this.postService.getComments(post.id);
  }

  @Mutation(() => PostEntity)
  // : Promise<PostEntity>
  async createPost(
    @Args('createPostInput') createPostDto: CreatePostDto,
  ): Promise<PostEntity> {
    return await this.postService.createPost(createPostDto);
  }
}

// # Write your query or mutation here
// {
//   findAll {
//     name,
//     id
//   }
// }

// mutation {
//   createPost(createPostInput:{
//     name: "post 4"
//   }),{
//     name,
//     id
//   }
// }
