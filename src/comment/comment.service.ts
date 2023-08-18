import { Injectable } from '@nestjs/common';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from './entities/comment.entity';
import { PostEntity } from 'src/post/entities/post.entity';
import { Repository, DataSource } from 'typeorm';
import { PostService } from 'src/post/post.service';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
    private readonly postService: PostService,
    @InjectDataSource() private datasource: DataSource,
  ) {}

  async create(createCommentInput: CreateCommentInput) {
    const result = this.commentRepository.create(createCommentInput);

    return this.commentRepository.save(result);
  }

  async getComment(postId: number): Promise<PostEntity> {
    return await this.postService.findOne(postId);
  }

  async findAll() {
    return await this.datasource
      .getRepository(CommentEntity)
      .createQueryBuilder('comments')
      .getMany();
  }

  async findOne(id: number) {
    const result = await this.commentRepository.findOne({
      where: {
        id: id,
      },
    });
    console.log(result);
    return result;
  }

  update(id: number, updateCommentInput: UpdateCommentInput) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
