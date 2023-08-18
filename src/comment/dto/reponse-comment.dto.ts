import { Expose } from 'class-transformer';
import { PostEntity } from 'src/post/entities/post.entity';

export class CommentResponse {
  @Expose()
  id: number;

  @Expose()
  conttent: string;

  @Expose()
  postId: PostEntity
}
