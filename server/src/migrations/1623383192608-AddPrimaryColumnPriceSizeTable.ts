import {MigrationInterface, QueryRunner} from "typeorm";

export class AddPrimaryColumnPriceSizeTable1623383192608 implements MigrationInterface {
    name = 'AddPrimaryColumnPriceSizeTable1623383192608'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "price_size" DROP CONSTRAINT "FK_7a23fc73e460aeffe59d75c2545"`);
        await queryRunner.query(`ALTER TABLE "price_size" DROP CONSTRAINT "FK_2df47b13f7130c544ec6384fd8a"`);
        await queryRunner.query(`COMMENT ON COLUMN "price_size"."productId" IS NULL`);
        await queryRunner.query(`ALTER TABLE "price_size" DROP CONSTRAINT "PK_5b2a1315d812d74f694671193bb"`);
        await queryRunner.query(`ALTER TABLE "price_size" ADD CONSTRAINT "PK_5807b4d70b004b0677d270f20b6" PRIMARY KEY ("sizeId", "id")`);
        await queryRunner.query(`COMMENT ON COLUMN "price_size"."sizeId" IS NULL`);
        await queryRunner.query(`ALTER TABLE "price_size" DROP CONSTRAINT "PK_5807b4d70b004b0677d270f20b6"`);
        await queryRunner.query(`ALTER TABLE "price_size" ADD CONSTRAINT "PK_aa50258808347c3e03eb84389ac" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "price_size" ADD CONSTRAINT "FK_7a23fc73e460aeffe59d75c2545" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "price_size" ADD CONSTRAINT "FK_2df47b13f7130c544ec6384fd8a" FOREIGN KEY ("sizeId") REFERENCES "size"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "price_size" DROP CONSTRAINT "FK_2df47b13f7130c544ec6384fd8a"`);
        await queryRunner.query(`ALTER TABLE "price_size" DROP CONSTRAINT "FK_7a23fc73e460aeffe59d75c2545"`);
        await queryRunner.query(`ALTER TABLE "price_size" DROP CONSTRAINT "PK_aa50258808347c3e03eb84389ac"`);
        await queryRunner.query(`ALTER TABLE "price_size" ADD CONSTRAINT "PK_5807b4d70b004b0677d270f20b6" PRIMARY KEY ("sizeId", "id")`);
        await queryRunner.query(`COMMENT ON COLUMN "price_size"."sizeId" IS NULL`);
        await queryRunner.query(`ALTER TABLE "price_size" DROP CONSTRAINT "PK_5807b4d70b004b0677d270f20b6"`);
        await queryRunner.query(`ALTER TABLE "price_size" ADD CONSTRAINT "PK_5b2a1315d812d74f694671193bb" PRIMARY KEY ("productId", "sizeId", "id")`);
        await queryRunner.query(`COMMENT ON COLUMN "price_size"."productId" IS NULL`);
        await queryRunner.query(`ALTER TABLE "price_size" ADD CONSTRAINT "FK_2df47b13f7130c544ec6384fd8a" FOREIGN KEY ("sizeId") REFERENCES "size"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "price_size" ADD CONSTRAINT "FK_7a23fc73e460aeffe59d75c2545" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
