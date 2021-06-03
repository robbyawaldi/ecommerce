import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateColor1622727539047 implements MigrationInterface {
    name = 'CreateColor1622727539047'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "color" ("id" character varying NOT NULL, "code" character varying NOT NULL, "sequence" integer NOT NULL, "productId" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d15e531d60a550fbf23e1832343" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "product" ADD "isMalikha" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "color" ADD CONSTRAINT "FK_11620774493e842bd7167f74c10" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "color" DROP CONSTRAINT "FK_11620774493e842bd7167f74c10"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "isMalikha"`);
        await queryRunner.query(`DROP TABLE "color"`);
    }

}
