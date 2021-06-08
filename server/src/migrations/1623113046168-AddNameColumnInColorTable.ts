import {MigrationInterface, QueryRunner} from "typeorm";

export class AddNameColumnInColorTable1623113046168 implements MigrationInterface {
    name = 'AddNameColumnInColorTable1623113046168'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "color" ADD "name" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "color" DROP COLUMN "name"`);
    }

}
