import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateGroupEntity1708797026771 implements MigrationInterface {
    name = 'CreateGroupEntity1708797026771'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."groups_status_enum" AS ENUM('active', 'inactive', 'deleted')`);
        await queryRunner.query(`CREATE TABLE "groups" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "created_by" integer, "updated_by" integer, "name" character varying NOT NULL, "tagline" character varying NOT NULL, "icon_document_id" integer NOT NULL, "status" "public"."groups_status_enum" NOT NULL, CONSTRAINT "PK_659d1483316afb28afd3a90646e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_0bf1c4383014c20f93761923a3" ON "groups" ("icon_document_id") `);
        await queryRunner.query(`ALTER TABLE "groups" ADD CONSTRAINT "FK_0bf1c4383014c20f93761923a3e" FOREIGN KEY ("icon_document_id") REFERENCES "documents"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "groups" DROP CONSTRAINT "FK_0bf1c4383014c20f93761923a3e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0bf1c4383014c20f93761923a3"`);
        await queryRunner.query(`DROP TABLE "groups"`);
        await queryRunner.query(`DROP TYPE "public"."groups_status_enum"`);
    }

}
