import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from 'database/data-source';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { join } from 'path';
import { CommentModule } from './comment/comment.module';
import { TitleModule } from './title/title.module';
import { GoogleSheetApiModule } from './google-sheet-api/google-sheet-api.module';
import { graphqlErrorFormat } from 'config';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeormConfig),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/grapql.schema.gql'),
      installSubscriptionHandlers: true, // enable subscription functionality.
      sortSchema: true,
      playground: true,
      formatError: graphqlErrorFormat,
      // plugins: [ApolloServerPluginLandingPageLocalDefault()],
      //   subscriptions: {
      //     'subscriptions-transport-ws': {
      //       path: '/graphql',
      //       onConnect: () => {
      //         console.log('Socket graphql connection established !');
      //       },
      //       onDisconnect: () => {
      //         console.log('Socket graphql connection disconnected !');
      //       },
      //     },
      //   },
    }),
    PostModule,
    CommentModule,
    TitleModule,
    GoogleSheetApiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
