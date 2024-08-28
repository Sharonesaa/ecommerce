import { MigrationInterface, QueryRunner } from "typeorm";

export class Intial1723870519855 implements MigrationInterface {
    name = 'Intial1723870519855'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "email" character varying(50) NOT NULL, "password" character varying(60) NOT NULL, "phone" integer, "country" character varying(50), "address" text, "isAdmin" boolean NOT NULL DEFAULT false, "city" character varying(50), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "totalAmount" numeric NOT NULL, "date" TIMESTAMP NOT NULL DEFAULT now(), "orderDetailId" uuid, CONSTRAINT "REL_1976b8d15ab024d096a042bcb5" UNIQUE ("orderDetailId"), CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order_detail" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "price" numeric NOT NULL, "quantity" integer NOT NULL, CONSTRAINT "PK_0afbab1fa98e2fb0be8e74f6b38" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "description" character varying(255) NOT NULL, "price" numeric(10,2) NOT NULL, "stock" integer NOT NULL, "imgUrl" character varying(255) DEFAULT 'default-image.jpg', "categoryId" uuid, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order_detail_products_products" ("orderDetailId" uuid NOT NULL, "productsId" uuid NOT NULL, CONSTRAINT "PK_aa416fe36c21c5e0768ce24b805" PRIMARY KEY ("orderDetailId", "productsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b3831e7735ef60978feb4cb2c3" ON "order_detail_products_products" ("orderDetailId") `);
        await queryRunner.query(`CREATE INDEX "IDX_a2c8aa529ed655cd23bcd6f3eb" ON "order_detail_products_products" ("productsId") `);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_caabe91507b3379c7ba73637b84" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_1976b8d15ab024d096a042bcb5a" FOREIGN KEY ("orderDetailId") REFERENCES "order_detail"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_ff56834e735fa78a15d0cf21926" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_detail_products_products" ADD CONSTRAINT "FK_b3831e7735ef60978feb4cb2c37" FOREIGN KEY ("orderDetailId") REFERENCES "order_detail"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "order_detail_products_products" ADD CONSTRAINT "FK_a2c8aa529ed655cd23bcd6f3ebf" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_detail_products_products" DROP CONSTRAINT "FK_a2c8aa529ed655cd23bcd6f3ebf"`);
        await queryRunner.query(`ALTER TABLE "order_detail_products_products" DROP CONSTRAINT "FK_b3831e7735ef60978feb4cb2c37"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_ff56834e735fa78a15d0cf21926"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_1976b8d15ab024d096a042bcb5a"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_caabe91507b3379c7ba73637b84"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a2c8aa529ed655cd23bcd6f3eb"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b3831e7735ef60978feb4cb2c3"`);
        await queryRunner.query(`DROP TABLE "order_detail_products_products"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "order_detail"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "categories"`);
    }

}
