import { Module, forwardRef } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentResolver } from './comment.resolver';
import { CommentEntity } from './entities/comment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModule } from 'src/post/post.module';
import { PubSub } from 'graphql-subscriptions';


@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity]), forwardRef(() =>PostModule)
 
],
  providers: [CommentResolver, CommentService,  {
    provide: 'PUB_SUB',
    useValue: new PubSub()
  }],
  exports:[CommentService]
})
export class CommentModule {}
