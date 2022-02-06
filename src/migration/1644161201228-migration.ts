/* eslint-disable class-methods-use-this */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1644161201228 implements MigrationInterface {
  name = 'migration1644161201228';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "task" DROP CONSTRAINT "FK_d88edac9d7990145ff6831a7bb3"
        `);
    await queryRunner.query(`
            ALTER TABLE "task"
            ALTER COLUMN "boardId" DROP NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "task"
            ADD CONSTRAINT "FK_d88edac9d7990145ff6831a7bb3" FOREIGN KEY ("boardId") REFERENCES "board"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "task" DROP CONSTRAINT "FK_d88edac9d7990145ff6831a7bb3"
        `);
    await queryRunner.query(`
            ALTER TABLE "task"
            ALTER COLUMN "boardId"
            SET NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "task"
            ADD CONSTRAINT "FK_d88edac9d7990145ff6831a7bb3" FOREIGN KEY ("boardId") REFERENCES "board"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
  }
}
