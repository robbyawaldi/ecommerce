import {MigrationInterface, QueryRunner} from "typeorm";

export class AddIdPriceSize1623316224976 implements MigrationInterface {
    name = 'AddIdPriceSize1623316224976'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "price_size" ADD "id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "price_size" DROP CONSTRAINT "PK_6f298b866051021eb1b319da956"`);
        await queryRunner.query(`ALTER TABLE "price_size" ADD CONSTRAINT "PK_5b2a1315d812d74f694671193bb" PRIMARY KEY ("productId", "sizeId", "id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "price_size" DROP CONSTRAINT "PK_5b2a1315d812d74f694671193bb"`);
        await queryRunner.query(`ALTER TABLE "price_size" ADD CONSTRAINT "PK_6f298b866051021eb1b319da956" PRIMARY KEY ("productId", "sizeId")`);
        await queryRunner.query(`ALTER TABLE "price_size" DROP COLUMN "id"`);
    }

}
