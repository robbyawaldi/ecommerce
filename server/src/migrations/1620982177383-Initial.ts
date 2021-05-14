import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1620982177383 implements MigrationInterface {
    name = 'Initial1620982177383'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "level" integer NOT NULL DEFAULT '0', "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "parentId" integer, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "size" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_66e3a0111d969aa0e5f73855c7a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" character varying NOT NULL, "title" character varying NOT NULL, "slug" character varying, "description" character varying NOT NULL, "detail" character varying NOT NULL DEFAULT '', "price" integer NOT NULL, "discount" integer NOT NULL DEFAULT '0', "stockAvailable" boolean NOT NULL, "isExclusive" boolean NOT NULL DEFAULT false, "isDiscount" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "image" ("id" character varying NOT NULL, "image" character varying NOT NULL, "sequence" integer NOT NULL, "productId" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d6db1ab4ee9ad9dbe86c64e4cc3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" character varying NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "roleId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_065d4d8f3b5adb4a08841eae3c8" UNIQUE ("name"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "role" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "slug" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_ae4578dcaed5adff96595e61660" UNIQUE ("name"), CONSTRAINT "UQ_35c9b140caaf6da09cfabb0d675" UNIQUE ("slug"), CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_sizes_size" ("productId" character varying NOT NULL, "sizeId" integer NOT NULL, CONSTRAINT "PK_92f139ef951e2ab39986aa6d443" PRIMARY KEY ("productId", "sizeId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c363d4050056518c07348e8a27" ON "product_sizes_size" ("productId") `);
        await queryRunner.query(`CREATE INDEX "IDX_a7bd6fac9cf96620ec68761ef3" ON "product_sizes_size" ("sizeId") `);
        await queryRunner.query(`CREATE TABLE "product_categories_category" ("productId" character varying NOT NULL, "categoryId" integer NOT NULL, CONSTRAINT "PK_17f2a361443184000ee8d79f240" PRIMARY KEY ("productId", "categoryId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_342d06dd0583aafc156e076379" ON "product_categories_category" ("productId") `);
        await queryRunner.query(`CREATE INDEX "IDX_15520e638eb4c46c4fb2c61c4b" ON "product_categories_category" ("categoryId") `);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "FK_d5456fd7e4c4866fec8ada1fa10" FOREIGN KEY ("parentId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "image" ADD CONSTRAINT "FK_c6eb61588205e25a848ba6105cd" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_sizes_size" ADD CONSTRAINT "FK_c363d4050056518c07348e8a27e" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_sizes_size" ADD CONSTRAINT "FK_a7bd6fac9cf96620ec68761ef3b" FOREIGN KEY ("sizeId") REFERENCES "size"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_categories_category" ADD CONSTRAINT "FK_342d06dd0583aafc156e0763790" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_categories_category" ADD CONSTRAINT "FK_15520e638eb4c46c4fb2c61c4b4" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_categories_category" DROP CONSTRAINT "FK_15520e638eb4c46c4fb2c61c4b4"`);
        await queryRunner.query(`ALTER TABLE "product_categories_category" DROP CONSTRAINT "FK_342d06dd0583aafc156e0763790"`);
        await queryRunner.query(`ALTER TABLE "product_sizes_size" DROP CONSTRAINT "FK_a7bd6fac9cf96620ec68761ef3b"`);
        await queryRunner.query(`ALTER TABLE "product_sizes_size" DROP CONSTRAINT "FK_c363d4050056518c07348e8a27e"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_c28e52f758e7bbc53828db92194"`);
        await queryRunner.query(`ALTER TABLE "image" DROP CONSTRAINT "FK_c6eb61588205e25a848ba6105cd"`);
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "FK_d5456fd7e4c4866fec8ada1fa10"`);
        await queryRunner.query(`DROP INDEX "IDX_15520e638eb4c46c4fb2c61c4b"`);
        await queryRunner.query(`DROP INDEX "IDX_342d06dd0583aafc156e076379"`);
        await queryRunner.query(`DROP TABLE "product_categories_category"`);
        await queryRunner.query(`DROP INDEX "IDX_a7bd6fac9cf96620ec68761ef3"`);
        await queryRunner.query(`DROP INDEX "IDX_c363d4050056518c07348e8a27"`);
        await queryRunner.query(`DROP TABLE "product_sizes_size"`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "image"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "size"`);
        await queryRunner.query(`DROP TABLE "category"`);
    }

}
