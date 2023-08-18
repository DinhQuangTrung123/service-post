import { Module, forwardRef } from '@nestjs/common';
import { PostService } from './post.service';
// import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';
import { PostResolvers } from './post.resolver';
import { CommentModule } from 'src/comment/comment.module';
// import { CommentModule } from '../comment/comment.module';

@Module({
  // CommentModule
  imports: [TypeOrmModule.forFeature([PostEntity]), forwardRef(() =>CommentModule)],
  // controllers: [PostController],
  providers: [PostService, PostResolvers],
  exports: [PostService]
})
export class PostModule {}
