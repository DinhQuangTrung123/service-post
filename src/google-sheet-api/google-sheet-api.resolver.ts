import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { GoogleSheetApiService } from './google-sheet-api.service';
import {
  AddRowGoogleSheetApiInput,
  CreateGoogleSheetApiInput,
  DeleteRowGoogleSheetApiInput,
  UpdateRowGoogleSheetApiInput,
} from './dto/create-google-sheet-api.input';

// import { UpdateGoogleSheetApiInput } from './dto/update-google-sheet-api.input';
import { GoogleSheetApiEntity } from './entities/google-sheet-api.entity';

@Resolver(() => GoogleSheetApiEntity)
export class GoogleSheetApiResolver {
  constructor(private readonly googleSheetApiService: GoogleSheetApiService) {}

  @Mutation(() => String, { name: 'initializeGoogleSheetApi' })
  async initializeGoogleSheetApi(
    @Args('initializeGoogleSheetApi')
    createGoogleSheetApiInput: CreateGoogleSheetApiInput,
  ): Promise<string> {
    await this.googleSheetApiService.initializeGoogleSheet(
      createGoogleSheetApiInput,
    );
    return 'create sheet success !';
  }

  @Mutation(() => String, { name: 'createGoogleSheetApi' })
  async createGoogleSheetApi(
    @Args('createGoogleSheetApiInput')
    createGoogleSheetApiInput: CreateGoogleSheetApiInput,
  ): Promise<string> {
    await this.googleSheetApiService.createGoogleSheetApi(
      createGoogleSheetApiInput,
    );
    return 'create sheet success !';
  }

  @Mutation(() => String, { name: 'addGoogleSheetApi' })
  async addGoogleSheetApi(
    @Args('addRowGoogleSheetApiInput')
    addRowGoogleSheetApiInput: AddRowGoogleSheetApiInput,
  ): Promise<string> {
    const result = await this.googleSheetApiService.addGoogleSheetApi(
      addRowGoogleSheetApiInput,
    );
    return result;
  }

  @Mutation(() => String, { name: 'DeleteRowGoogleSheet' })
  async deleteGoogleSheetApi(
    @Args('deleteRowGoogleSheetApiInput')
    deleteRowGoogleSheetApiInput: DeleteRowGoogleSheetApiInput,
  ): Promise<string> {
    console.log(deleteRowGoogleSheetApiInput);
    const result = await this.googleSheetApiService.deleteGoogleSheetApi(
      deleteRowGoogleSheetApiInput,
    );
    return result;
  }

  @Mutation(() => String, { name: 'UpdateGoogleSheet' })
  async updateGoogleSheetApi(
    @Args('updateRowGoogleSheetApiInput')
    updateRowGoogleSheetApiInput: UpdateRowGoogleSheetApiInput,
  ): Promise<string> {
    const result = await this.googleSheetApiService.updateGoogleSheetApi(
      updateRowGoogleSheetApiInput,
    );
    return result;
  }

  @Query(() => String, { name: 'downloadRowGoogleSheet' })
  async downloadRowGoogleSheet(): Promise<string> {
    const result = await this.googleSheetApiService.downloadRowGoogleSheet();

    return result;
  }
}
