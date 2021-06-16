import {MigrationInterface, QueryRunner} from "typeorm";

export class AddExceptSizesToColorTable1623749273009 implements MigrationInterface {
    name = 'AddExceptSizesToColorTable1623749273009'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "color_except_sizes_size" ("colorId" character varying NOT NULL, "sizeId" integer NOT NULL, CONSTRAINT "PK_1d1a683d71ab90541af193435a1" PRIMARY KEY ("colorId", "sizeId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_997b66e30517989d2ac669835a" ON "color_except_sizes_size" ("colorId") `);
        await queryRunner.query(`CREATE INDEX "IDX_f335fd6b8c776fe986296c5ba9" ON "color_except_sizes_size" ("sizeId") `);
        await queryRunner.query(`ALTER TABLE "color_except_sizes_size" ADD CONSTRAINT "FK_997b66e30517989d2ac669835ae" FOREIGN KEY ("colorId") REFERENCES "color"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "color_except_sizes_size" ADD CONSTRAINT "FK_f335fd6b8c776fe986296c5ba93" FOREIGN KEY ("sizeId") REFERENCES "size"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "color_except_sizes_size" DROP CONSTRAINT "FK_f335fd6b8c776fe986296c5ba93"`);
        await queryRunner.query(`ALTER TABLE "color_except_sizes_size" DROP CONSTRAINT "FK_997b66e30517989d2ac669835ae"`);
        await queryRunner.query(`DROP INDEX "IDX_f335fd6b8c776fe986296c5ba9"`);
        await queryRunner.query(`DROP INDEX "IDX_997b66e30517989d2ac669835a"`);
        await queryRunner.query(`DROP TABLE "color_except_sizes_size"`);
    }

}
