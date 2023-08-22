import { Test, TestingModule } from '@nestjs/testing';
import { GoogleSheetApiResolver } from './google-sheet-api.resolver';
import { GoogleSheetApiService } from './google-sheet-api.service';

describe('GoogleSheetApiResolver', () => {
  let resolver: GoogleSheetApiResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GoogleSheetApiResolver, GoogleSheetApiService],
    }).compile();

    resolver = module.get<GoogleSheetApiResolver>(GoogleSheetApiResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
