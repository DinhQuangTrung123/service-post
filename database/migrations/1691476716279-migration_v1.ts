import { MigrationInterface, QueryRunner } from 'typeorm';

export class MigrationV11691476716279 implements MigrationInterface {
  name = 'MigrationV11691476716279';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "Post" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_c4d3b3dcd73db0b0129ea829f9f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "Comment" ("id" SERIAL NOT NULL, "content" character varying NOT NULL, "postId" integer, CONSTRAINT "PK_fe8d6bf0fcb531dfa75f3fd5bdb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "Title" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "version" integer NOT NULL DEFAULT '1', CONSTRAINT "PK_584b474a8fda4f726f9ee0ffbe7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "Comment" ADD CONSTRAINT "FK_fb770b565e79f3a4a2ecef894a7" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "Comment" DROP CONSTRAINT "FK_fb770b565e79f3a4a2ecef894a7"`,
    );
    await queryRunner.query(`DROP TABLE "Title"`);
    await queryRunner.query(`DROP TABLE "Comment"`);
    await queryRunner.query(`DROP TABLE "Post"`);
  }
}
