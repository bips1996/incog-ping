import { MigrationInterface, QueryRunner } from "typeorm";

export class Document1708455246895 implements MigrationInterface {
  name = "Document1708455246895";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."documents_store_type_enum" AS ENUM('s3', 'local', 'db')`
    );
    await queryRunner.query(
      `CREATE TABLE "documents" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "created_by" integer, "updated_by" integer, "file_name" character varying NOT NULL, "file_type" character varying NOT NULL, "document_type_id" integer NOT NULL, "uploaded_on" TIMESTAMP NOT NULL, "user_id" integer NOT NULL, "store_type" "public"."documents_store_type_enum" NOT NULL DEFAULT 'db', "file_stream" character varying, "object_key" character varying, CONSTRAINT "PK_ac51aa5181ee2036f5ca482857c" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c7481daf5059307842edef74d7" ON "documents" ("user_id") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5e174bbf5fb523874f836c425e" ON "documents" ("document_type_id") `
    );
    await queryRunner.query(
      `ALTER TABLE "documents" ADD CONSTRAINT "FK_c7481daf5059307842edef74d73" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "documents" ADD CONSTRAINT "FK_5e174bbf5fb523874f836c425e9" FOREIGN KEY ("document_type_id") REFERENCES "document_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "documents" DROP CONSTRAINT "FK_5e174bbf5fb523874f836c425e9"`
    );
    await queryRunner.query(
      `ALTER TABLE "documents" DROP CONSTRAINT "FK_c7481daf5059307842edef74d73"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_5e174bbf5fb523874f836c425e"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_c7481daf5059307842edef74d7"`
    );
    await queryRunner.query(`DROP TABLE "documents"`);
    await queryRunner.query(`DROP TYPE "public"."documents_store_type_enum"`);
  }
}
