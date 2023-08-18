import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationV11691483494440 implements MigrationInterface {
    name = 'MigrationV11691483494440'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Title" ADD "status" integer NOT NULL DEFAULT '1'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Title" DROP COLUMN "status"`);
    }

}
