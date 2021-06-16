import {MigrationInterface, QueryRunner} from "typeorm";

export class PriceSizeAddCascadeOnDelete1623812782378 implements MigrationInterface {
    name = 'PriceSizeAddCascadeOnDelete1623812782378'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "price_size" DROP CONSTRAINT "FK_7a23fc73e460aeffe59d75c2545"`);
        await queryRunner.query(`ALTER TABLE "price_size" ADD CONSTRAINT "FK_7a23fc73e460aeffe59d75c2545" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "price_size" DROP CONSTRAINT "FK_7a23fc73e460aeffe59d75c2545"`);
        await queryRunner.query(`ALTER TABLE "price_size" ADD CONSTRAINT "FK_7a23fc73e460aeffe59d75c2545" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
