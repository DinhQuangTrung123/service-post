import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostResponse } from './dto/response-post.dto';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { PostEntity } from './entities/post.entity';
import { CommentService } from '../comment/comment.service';
import { CommentEntity } from '../comment/entities/comment.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
    @InjectDataSource() private datasource: DataSource,
  ) {}

  // Promise<PostResponse>
  async createPost(createPostDto: CreatePostDto) {
    const result = await this.postRepository.save(createPostDto);
    console.log(result);
    // return plainToInstance(TitleResponse, result);
    return result;
  }

  async getComments(postId: number) {
    console.log('result');
    console.log(typeof postId);
    const result = await this.datasource
      .getRepository(CommentEntity)
      .createQueryBuilder('comment')
      .where('comment.postId = :postId', { postId: postId })
      .getMany();
    console.log('reponse', result);
    // return plainToInstance(TitleResponse, result);
    return result;
  }

  async findAll() {
    // const questions = this.questionsRepository.find();
    return await this.datasource
      .getRepository(PostEntity)
      .createQueryBuilder('posts')
      .getMany();
    // .getRawMany(); // hiện thị các khóa ngoại trên cùng một cấp json
  }

  async findOne(id: number) {
    const result = await this.postRepository.findOne({
      where: {
        id: id,
      },
    });
    console.log(result);
    return result;
  }

  // async getComment(commentId: number): Promise<CommentEntity>{
  //   return await this.commentService.findOne(commentId)
  // }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
