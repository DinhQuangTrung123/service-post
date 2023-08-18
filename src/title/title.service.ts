import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, DataSource, getConnection } from 'typeorm';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { TitleEntity } from './entities/title.entity';
import { CreateTitleInput } from './dto/create-title.dto';
import { UpdateTitleDto } from './dto/update-title.dto';

@Injectable()
export class TitleService {
  constructor(
    @InjectRepository(TitleEntity)
    private readonly titleRepository: Repository<TitleEntity>,
    @InjectDataSource() private datasource: DataSource,
  ) {}

  async findOne(id: number) {
    const result = await this.titleRepository.findOne({
      where: {
        id: id,
      },
    });
    console.log(result);
    return result;
  }

  async Titles() {
    return `This action returns all title`;
  }

  async getTitles(titleId: number) {
    const result = await this.datasource
      .getRepository(TitleEntity)
      .createQueryBuilder('title')
      .where('title.id = :titleId', { titleId: titleId })
      .getMany();
    return result;
  }

  async createTitle(createTitleDto: CreateTitleInput) {
    const result = await this.titleRepository.save(createTitleDto);
    console.log(result);

    return result;
  }

  async updateTitle(updateTitleDto: UpdateTitleDto): Promise<TitleEntity> {
    try {
      const title = await this.titleRepository.findOne({
        where: {
          id: updateTitleDto.titleId,
        },
      });

      if (!title) {
        throw new NotFoundException('title not found');
      }

      // function sleep(ms) {
      //   return new Promise((resolve) => setTimeout(resolve, ms));
      // }
      // await sleep(2000);

      // Store the original version number before updating
      const originalVersion = title.version;
      title.version++;

      // Update the user's data
      this.titleRepository.merge(title, {
        name: 'update 1',
      });
      const updatedUser = await this.titleRepository.save(title);

      console.log('updateTitle');
      // Check if the version has changed during the update
      if (updatedUser.version !== originalVersion) {
        throw new Error('Conflict detected. Please retry.');
      }
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }

  async updateTitle2(updateTitleDto: UpdateTitleDto): Promise<TitleEntity> {
    try {
      const title = await this.titleRepository.findOne({
        where: {
          id: updateTitleDto.titleId,
        },
      });

      if (!title) {
        throw new NotFoundException('title not found');
      }

      function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
      }
      await sleep(1000);
      // Store the original version number before updating
      const originalVersion = title.version;
      title.version++;

      // Update the user's data
      this.titleRepository.merge(title, {
        name: 'update 2',
      });
      const updatedUser = await this.titleRepository.save(title);
      console.log('updateTitle2');
      // Check if the version has changed during the update
      if (updatedUser.version !== originalVersion) {
        throw new Error('Conflict detected. Please retry.');
      }
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }

  async updateTitle3(updateTitleDto: UpdateTitleDto): Promise<TitleEntity> {
    try {
      const title = await this.titleRepository.findOne({
        where: {
          id: updateTitleDto.titleId,
        },
      });

      if (!title) {
        throw new NotFoundException('title not found');
      }

      function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
      }
      await sleep(3000);
      // Store the original version number before updating
      const originalVersion = title.version;
      title.version++;

      // Update the user's data
      this.titleRepository.merge(title, {
        name: 'update 3',
      });
      const updatedUser = await this.titleRepository.save(title);
      console.log('updateTitle3');
      // Check if the version has changed during the update
      if (updatedUser.version !== originalVersion) {
        throw new Error('Conflict detected. Please retry.');
      }
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }

  async updateTitleTransaction(updateTitleDto: UpdateTitleDto) {
    // get a connection and create a new query runner
    console.log(updateTitleDto);
    const queryRunner = this.datasource.createQueryRunner();

    // establish real database connection using our new query runner
    await queryRunner.connect();

    // lets now open a new transaction:
    await queryRunner.startTransaction();

    // now we can execute any queries on a query runner, for example:
    // await queryRunner.query('SELECT * FROM users');

    try {
      // we can also access entity manager that works with connection created by a query runner:
      await queryRunner.manager
        .getRepository(TitleEntity)
        .createQueryBuilder('title')
        .useTransaction(true)
        .setLock('pessimistic_write')
        .where('id = :id', { id: 1 })
        .getOne();

      // // execute some operations on this transaction:
      // await queryRunner.manager.save(user1);
      // await queryRunner.manager.save(user2);
      // await queryRunner.manager.save(photos);

      await queryRunner.manager
        .getRepository(TitleEntity)
        .createQueryBuilder('title')
        .update()
        .set({ name: updateTitleDto.name })
        .where('id = :id', { id: 2 })
        .execute();

      // commit transaction now:
      await queryRunner.commitTransaction();
      console.log('transaction 1');
    } catch (err) {
      console.log(err);
      // since we have errors let's rollback changes we made
      await queryRunner.rollbackTransaction();
    } finally {
      // you need to release query runner which is manually created:
      await queryRunner.release();
    }
  }

  async updateTitleTransaction2(updateTitleDto: UpdateTitleDto) {
    // get a connection and create a new query runner
    console.log(updateTitleDto);
    const queryRunner = this.datasource.createQueryRunner();

    // establish real database connection using our new query runner
    await queryRunner.connect();

    // lets now open a new transaction:
    await queryRunner.startTransaction();

    // now we can execute any queries on a query runner, for example:
    // await queryRunner.query('SELECT * FROM users');

    try {
      // we can also access entity manager that works with connection created by a query runner:
      await queryRunner.manager
        .getRepository(TitleEntity)
        .createQueryBuilder('title')
        .useTransaction(true)
        .setLock('pessimistic_write')
        .where('id = :id', { id: 2 })
        .getOne();

      // // execute some operations on this transaction:
      // await queryRunner.manager.save(user1);
      // await queryRunner.manager.save(user2);
      // await queryRunner.manager.save(photos);
      // function sleep(ms) {
      //   return new Promise((resolve) => setTimeout(resolve, ms));
      // }
      // await sleep(2000);
      await queryRunner.manager
        .getRepository(TitleEntity)
        .createQueryBuilder('title')
        .update()
        .set({ name: 'title transation 1' })
        .where('id = :id', { id: 1 })
        .execute();

      console.log('transaction 2');
      // commit transaction now:
      await queryRunner.commitTransaction();
    } catch (err) {
      // since we have errors let's rollback changes we made
      // await queryRunner.rollbackTransaction();
    } finally {
      // you need to release query runner which is manually created:
      await queryRunner.release();
    }
  }

  async updateTitleTransactionDeadllock(updateTitleDto: UpdateTitleDto) {
    // get a connection and create a new query runner
    // console.log(updateTitleDto);
    const queryRunner = this.datasource.createQueryRunner();

    // establish real database connection using our new query runner
    await queryRunner.connect();

    // lets now open a new transaction:
    await queryRunner.startTransaction();

    try {
      // we can also access entity manager that works with connection created by a query runner:
      await queryRunner.manager
        .getRepository(TitleEntity)
        .createQueryBuilder('title')
        // .useTransaction(true)
        .setLock('pessimistic_write')
        .where('id = :id', { id: updateTitleDto.titleId })
        .getOne();

      await queryRunner.manager
        .getRepository(TitleEntity)
        .createQueryBuilder('title')
        .update()
        .set({ name: 'title transation 1' })
        .where('id = :id', { id: updateTitleDto.titleId })
        .execute();

      console.log('transaction deallock delete 1');
      // commit transaction now:
      await queryRunner.commitTransaction();
    } catch (err) {
      console.log(err);
      // since we have errors let's rollback changes we made
      await queryRunner.rollbackTransaction();
    }
    //  finally {
    //   // you need to release query runner which is manually created:
    //   await queryRunner.release();
    // }
  }

  async updateTitleTransactionDeadllock2(updateTitleDto: UpdateTitleDto) {
    console.log('+++++', updateTitleDto);
    this.datasource.manager.transaction(
      // 'SERIALIZABLE',
      async (transactionalEntityManager) => {
        // Acquire a pessimistic write lock using query builder
        const title = await transactionalEntityManager
          .createQueryBuilder(TitleEntity, 'title')
          // .useTransaction(true)
          // .setLock('pessimistic_write')
          .where('id = :id', { id: updateTitleDto.titleId })
          .getOne();
        // console.log('+++++', title);
        if (title) {
          title.name = updateTitleDto.name;
          transactionalEntityManager.save(title);
        }
        //   const title = await transactionalEntityManager
        //     .createQueryBuilder(TitleEntity, 'title')
        //     .insert()
        //     .into(TitleEntity)
        //     .values([{ name: 'Title 1', id: 1 }])
        //     .execute();
      },
    );
  }

  async updateTitleTransactionDeadllock3(updateTitleDto: UpdateTitleDto) {
    console.log('+++++', updateTitleDto);
    this.datasource.manager.transaction(
      // 'SERIALIZABLE',
      async (transactionalEntityManager) => {
        // Acquire a pessimistic write lock using query builder
        const title = await transactionalEntityManager
          .createQueryBuilder(TitleEntity, 'title')
          // .useTransaction(true)
          // .setLock('pessimistic_write')
          .where('id = :id', { id: updateTitleDto.titleId })
          .getOne();
        // console.log('+++++', title);
        if (title) {
          title.name = updateTitleDto.name;
          transactionalEntityManager.save(title);
        }
        // const title = await transactionalEntityManager
        //   .createQueryBuilder(TitleEntity, 'title')
        //   .insert()
        //   .into(TitleEntity)
        //   .values([{ name: 'Title 1', id: 1 }])
        //   .execute();
      },
    );
  }

  async deleteTitleTransactionDeadllock(updateTitleDto: UpdateTitleDto) {
    // get a connection and create a new query runner
    // console.log(updateTitleDto);
    const queryRunner = this.datasource.createQueryRunner();

    // establish real database connection using our new query runner
    await queryRunner.connect();

    // lets now open a new transaction:
    await queryRunner.startTransaction();

    try {
      // we can also access entity manager that works with connection created by a query runner:
      await queryRunner.manager
        .getRepository(TitleEntity)
        .createQueryBuilder('title')
        .useTransaction(true)
        .setLock('pessimistic_write')
        .where('id = :id', { id: updateTitleDto.titleId })
        .getOne();

      await queryRunner.manager
        .getRepository(TitleEntity)
        .createQueryBuilder('title')
        .delete()
        .from(TitleEntity)
        .where('id = :id', { id: updateTitleDto.titleId })
        .execute();
      console.log('delete transaction deallock 1');
      // commit transaction now:
      await queryRunner.commitTransaction();
    } catch (err) {
      console.log(err);
      // since we have errors let's rollback changes we made
      await queryRunner.rollbackTransaction();
    }
    // finally {
    //   // you need to release query runner which is manually created:
    //   await queryRunner.release();
    // }
  }

  async insertTitleTransactionDeadllock(updateTitleDto: UpdateTitleDto) {
    // get a connection and create a new query runner
    // console.log(updateTitleDto);
    const queryRunner = this.datasource.createQueryRunner();

    // establish real database connection using our new query runner
    await queryRunner.connect();

    // lets now open a new transaction:
    await queryRunner.startTransaction();

    try {
      // we can also access entity manager that works with connection created by a query runner:
      await queryRunner.manager
        .getRepository(TitleEntity)
        .createQueryBuilder('title')
        .useTransaction(true)
        .setLock('pessimistic_write')
        .where('id = :id', { id: updateTitleDto.titleId })
        .getOne();

      await queryRunner.manager
        .getRepository(TitleEntity)
        .createQueryBuilder()
        .insert()
        .into(TitleEntity)
        .values([{ name: 'Title 1', id: 1 }])
        .execute();
      console.log('insert transaction deallock 1');
      // commit transaction now:
      await queryRunner.commitTransaction();
    } catch (err) {
      console.log(err);
      // since we have errors let's rollback changes we made
      await queryRunner.rollbackTransaction();
    }
    // finally {
    //   // you need to release query runner which is manually created:
    //   await queryRunner.release();
    // }
  }

  async updateTitleTransactionDeadllocktest1(updateTitleDto: UpdateTitleDto) {
    // get a connection and create a new query runner
    // console.log(updateTitleDto);
    const queryRunner = this.datasource.createQueryRunner();

    // establish real database connection using our new query runner
    await queryRunner.connect();

    // lets now open a new transaction:
    await queryRunner.startTransaction();

    try {
      // we can also access entity manager that works with connection created by a query runner:
      await queryRunner.manager
        .getRepository(TitleEntity)
        .createQueryBuilder('title')
        // .useTransaction(true)
        .setLock('pessimistic_write')
        .where('id = :id', { id: 8 })
        .getOne();

      await queryRunner.manager
        .getRepository(TitleEntity)
        .createQueryBuilder('title')
        .update()
        .set({ name: 'title transation 1' })
        .where('id = :id', { id: 8 })
        .execute();

      function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
      }
      await sleep(1000);

      await queryRunner.manager
        .getRepository(TitleEntity)
        .createQueryBuilder('title')
        .update()
        .set({ name: 'title transation 1' })
        .where('id = :id', { id: 19 })
        .execute();

      await sleep(1000);

      console.log('transaction deallock delete 1');
      // commit transaction now:
      // await queryRunner.commitTransaction();
    } catch (err) {
      console.log(err);
      // since we have errors let's rollback changes we made
      await queryRunner.rollbackTransaction();
    }
  }
  async updateTitleTransactionDeadllocktest2(updateTitleDto: UpdateTitleDto) {
    // get a connection and create a new query runner
    // console.log(updateTitleDto);
    const queryRunner = this.datasource.createQueryRunner();

    // establish real database connection using our new query runner
    await queryRunner.connect();

    // lets now open a new transaction:
    await queryRunner.startTransaction();

    try {
      // we can also access entity manager that works with connection created by a query runner:
      await queryRunner.manager
        .getRepository(TitleEntity)
        .createQueryBuilder('title')
        // .useTransaction(true)
        .setLock('pessimistic_write')
        .where('id = :id', { id: 19 })
        .getOne();

      await queryRunner.manager
        .getRepository(TitleEntity)
        .createQueryBuilder('title')
        .update()
        .set({ name: 'title transation 2' })
        .where('id = :id', { id: 19 })
        .execute();

      function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
      }
      await sleep(1000);

      await queryRunner.manager
        .getRepository(TitleEntity)
        .createQueryBuilder('title')
        .update()
        .set({ name: 'title transation 2' })
        .where('id = :id', { id: 8 })
        .execute();

      console.log('transaction deallock delete 2');
      // commit transaction now:
      // await queryRunner.commitTransaction();
    } catch (err) {
      console.log(err);
      // since we have errors let's rollback changes we made
      await queryRunner.rollbackTransaction();
    }
  }
}
