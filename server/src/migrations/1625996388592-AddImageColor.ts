import {MigrationInterface, QueryRunner} from "typeorm";

export class AddImageColor1625996388592 implements MigrationInterface {
    name = 'AddImageColor1625996388592'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "image" ADD "color" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "image" DROP COLUMN "color"`);
    }

}
