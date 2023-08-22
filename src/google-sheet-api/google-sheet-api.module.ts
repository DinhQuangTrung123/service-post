import { Module } from '@nestjs/common';
import { GoogleSheetApiService } from './google-sheet-api.service';
import { GoogleSheetApiResolver } from './google-sheet-api.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoogleSheetApiEntity } from './entities/google-sheet-api.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GoogleSheetApiEntity])],
  providers: [GoogleSheetApiResolver, GoogleSheetApiService],
})
export class GoogleSheetApiModule {}
