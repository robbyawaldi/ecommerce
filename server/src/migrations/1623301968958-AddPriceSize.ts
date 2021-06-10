import {MigrationInterface, QueryRunner} from "typeorm";

export class AddPriceSize1623301968958 implements MigrationInterface {
    name = 'AddPriceSize1623301968958'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "price_size" ("productId" character varying NOT NULL, "sizeId" integer NOT NULL, "price" integer NOT NULL, CONSTRAINT "PK_6f298b866051021eb1b319da956" PRIMARY KEY ("productId", "sizeId"))`);
        await queryRunner.query(`ALTER TABLE "price_size" ADD CONSTRAINT "FK_7a23fc73e460aeffe59d75c2545" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "price_size" ADD CONSTRAINT "FK_2df47b13f7130c544ec6384fd8a" FOREIGN KEY ("sizeId") REFERENCES "size"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "price_size" DROP CONSTRAINT "FK_2df47b13f7130c544ec6384fd8a"`);
        await queryRunner.query(`ALTER TABLE "price_size" DROP CONSTRAINT "FK_7a23fc73e460aeffe59d75c2545"`);
        await queryRunner.query(`DROP TABLE "price_size"`);
    }

}
