import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';

export const typeormConfig: DataSourceOptions & TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  // entities: [PostEntity, CommentEntity, TitleEntity],
  entities: ['dist/src/**/entities/*.entity.js'],
  migrations: ['dist/**/migrations/*.{js,ts}'],
  synchronize: false,
  migrationsRun: true,
};

// console.log(process.env.DB_USERNAME);

const data_Source = new DataSource(typeormConfig);
export default data_Source;
