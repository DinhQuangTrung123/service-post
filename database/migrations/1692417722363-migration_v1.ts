import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationV11692417722363 implements MigrationInterface {
    name = 'MigrationV11692417722363'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "google sheet api" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_5f56ee866f11544f7d90b09a079" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "google sheet api"`);
    }

}
