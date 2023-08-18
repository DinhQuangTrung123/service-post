import { Module, forwardRef } from '@nestjs/common';
import { TitleService } from './title.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TitleEntity } from './entities/title.entity';
import { TitleResolvers } from './title.resolver';
// import { TitleController } from './title.controller';

@Module({
  // controllers: [TitleController],
  imports: [TypeOrmModule.forFeature([TitleEntity])],
  providers: [TitleService, TitleResolvers],
})
export class TitleModule {}
