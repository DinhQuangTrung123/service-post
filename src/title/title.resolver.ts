import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { TitleEntity } from './entities/title.entity';
import { CreateTitleInput } from './dto/create-title.dto';
import { TitleService } from './title.service';
import { UpdateTitleDto } from './dto/update-title.dto';

@Resolver(() => TitleEntity)
export class TitleResolvers {
  constructor(private readonly titleService: TitleService) {}

  @Query(() => TitleEntity)
  async findOne(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<TitleEntity> {
    return await this.titleService.findOne(id);
  }

  @ResolveField(() => [TitleEntity])
  async getTitles(@Parent() title: TitleEntity): Promise<TitleEntity[]> {
    return await this.titleService.getTitles(title.id);
  }

  @Mutation(() => TitleEntity)
  async createTitle(
    @Args('CreateTitleInput') createPostDto: CreateTitleInput,
  ): Promise<TitleEntity> {
    return await this.titleService.createTitle(createPostDto);
  }

  @Mutation(() => TitleEntity)
  async updateTitle(@Args('updateTitleDto') updateTitleDto: UpdateTitleDto) {
    // await this.titleService.updateTitle(updateTitleDto)
    // const promises = [];

    // for (let i = 0; i < 5; i++) {
    //   promises.push(this.titleService.updateTitle(updateTitleDto));
    // }
    // try {
    // await Promise.all([
    //   this.titleService.updateTitle(updateTitleDto),
    //   this.titleService.updateTitle2(updateTitleDto),
    //   this.titleService.updateTitle3(updateTitleDto),
    // ]);
    this.titleService.updateTitle(updateTitleDto);
    this.titleService.updateTitle2(updateTitleDto);
    this.titleService.updateTitle3(updateTitleDto);
    return {
      id: 1,
      name: 'title 1 for update 2',
      version: 1,
      status: 1,
    };
    // } catch (error) {
    //   throw error;
    // }
  }

  @Mutation(() => TitleEntity)
  async updateTitleTransaction(
    @Args('updateTitleDto') updateTitleDto: UpdateTitleDto,
  ) {
    const testupdate2: UpdateTitleDto = {
      name: 'title 1 for update 2',
      titleId: 1,
    };
    await Promise.all([
      this.titleService.updateTitleTransaction(updateTitleDto),
      // this.titleService.updateTitleTransaction(updateTitleDto),
      // this.titleService.updateTitleTransaction(updateTitleDto),
      this.titleService.updateTitleTransaction2(testupdate2),
      // this.titleService.updateTitleTransaction2(testupdate2),
      // this.titleService.updateTitleTransaction(updateTitleDto),
      // this.titleService.updateTitleTransaction(updateTitleDto),
      // this.titleService.updateTitleTransaction(updateTitleDto),
      // this.titleService.updateTitleTransaction2(testupdate2),
      // this.titleService.updateTitleTransaction2(testupdate2),
      // this.titleService.updateTitleTransaction2(testupdate2),
    ]);
    return {
      id: 1,
      name: 'title 1 for update 2',
      version: 1,
      status: 1,
    };
  }
  @Mutation(() => TitleEntity)
  async updateTitleTransactionDeallock(
    @Args('updateTitleDto') updateTitleDto: UpdateTitleDto,
  ) {
    const testdealock2: UpdateTitleDto = {
      name: 'title 1 for update 2',
      titleId: 3,
    };

    await Promise.all([
      // this.titleService.updateTitleTransactionDeadllock2(testdealock2),
      // this.titleService.updateTitleTransactionDeadllock2(updateTitleDto),
      // this.titleService.updateTitleTransactionDeadllock2(testdealock2),
      // this.titleService.insertTitleTransactionDeadllock(updateTitleDto),

      this.titleService.updateTitleTransactionDeadllocktest1(updateTitleDto),
      this.titleService.updateTitleTransactionDeadllocktest2(testdealock2),
      // this.titleService.updateTitleTransactionDeadllocktest2(testdealock2),
      // this.titleService.updateTitleTransactionDeadllock2(updateTitleDto),
      // this.titleService.updateTitleTransactionDeadllock3(testdealock2),
      // this.titleService.updateTitleTransactionDeadllock2(updateTitleDto),
      // this.titleService.updateTitleTransactionDeadllock3(testdealock2),

      // this.titleService.deleteTitleTransactionDeadllock(testdealock2),
      // this.titleService.deleteTitleTransactionDeadllock(updateTitleDto),
      // this.titleService.deleteTitleTransactionDeadllock(testdealock2),
      // this.titleService.deleteTitleTransactionDeadllock(updateTitleDto),
      // this.titleService.updateTitleTransactionDeadllock2(testdealock2),
      // this.titleService.updateTitleTransactionDeadllock(updateTitleDto),
    ]);
    //  this.titleService.updateTitleTransactionDeadllock(testdealock2);
    //  this.titleService.updateTitleTransactionDeadllock(updateTitleDto);
    //  this.titleService.updateTitleTransactionDeadllock(testdealock2);
    //  this.titleService.updateTitleTransactionDeadllock(updateTitleDto);
    //  this.titleService.updateTitleTransactionDeadllock(testdealock2);
    //  this.titleService.updateTitleTransactionDeadllock(updateTitleDto);
    //  this.titleService.updateTitleTransactionDeadllock(testdealock2);
    //  this.titleService.updateTitleTransactionDeadllock(updateTitleDto);
    //  this.titleService.updateTitleTransactionDeadllock(testdealock2);
    //  this.titleService.updateTitleTransactionDeadllock(updateTitleDto);
    //  this.titleService.updateTitleTransactionDeadllock(testdealock2);
    //  this.titleService.updateTitleTransactionDeadllock(updateTitleDto);
    //  this.titleService.updateTitleTransactionDeadllock(testdealock2);
    //  this.titleService.updateTitleTransactionDeadllock(updateTitleDto);
    //  this.titleService.updateTitleTransactionDeadllock(testdealock2);
    // this.titleService.updateTitleTransactionDeadllock(updateTitleDto);

    return {
      id: 1,
      name: 'title 1 for update 2',
      version: 1,
      status: 1,
    };
  }
}
