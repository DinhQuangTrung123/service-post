// import {
//   Controller,
//   Get,
//   Post,
//   Body,
//   Patch,
//   Param,
//   Delete,
// } from '@nestjs/common';
// import { PostService } from './post.service';
// import { CreatePostDto } from './dto/create-post.dto';
// import { GrpcMethod } from '@nestjs/microservices';
// import { UpdatePostDto } from './dto/update-post.dto';
// import { PostResponse } from './dto/response-post.dto';

// @Controller('post')
// export class PostController {
//   constructor(private readonly postService: PostService) {}

//   // @GrpcMethod('PostController', 'createPost')
//   // async createPost(createPostDto: CreatePostDto): Promise<PostResponse> {
//   //   console.log('into Post');
//   //   console.log(createPostDto);
//   //   const result = await this.postService.createPost(createPostDto);
//   //   console.log(result);
//   //   return result;
//   // }

//   @Get()
//   findAll() {
//     return this.postService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.postService.findOne(+id);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
//     return this.postService.update(+id, updatePostDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.postService.remove(+id);
//   }
// }
