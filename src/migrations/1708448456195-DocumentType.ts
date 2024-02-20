import { MigrationInterface, QueryRunner } from "typeorm";

export class DocumentType1708448456195 implements MigrationInterface {
  name = "DocumentType1708448456195";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "document_types" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "created_by" integer, "updated_by" integer, "name" character varying NOT NULL, "identifier" character varying NOT NULL, "allowed_file_types" character varying array NOT NULL, CONSTRAINT "UQ_17830f65716c68f60786608799d" UNIQUE ("identifier"), CONSTRAINT "PK_d467d7eeb7c8ce216e90e8494aa" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "document_types"`);
  }
}
