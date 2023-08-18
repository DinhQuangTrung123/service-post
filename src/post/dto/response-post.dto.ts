import { Expose } from 'class-transformer';
import { CommentEntity } from 'src/comment/entities/comment.entity';
export class PostResponse {
  @Expose()
  id: number;

  @Expose()
  name: string;

  // @Expose()
  // contents: CommentEntity[]
  }
