import {MigrationInterface, QueryRunner} from "typeorm";

export class CategorySequence1622034250802 implements MigrationInterface {
    name = 'CategorySequence1622034250802'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" ADD "sequence" integer NOT NULL DEFAULT '1'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "sequence"`);
    }

}
