import { MigrationInterface, QueryRunner } from "typeorm";

export class UserDocument1708455786872 implements MigrationInterface {
  name = "UserDocument1708455786872";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_documents" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "created_by" integer, "updated_by" integer, "user_id" integer NOT NULL, "document_id" integer NOT NULL, CONSTRAINT "PK_cea43819156528b63504c4afd4b" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_aa4b82a9943c65b5f622a6925b" ON "user_documents" ("user_id") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_7be233cb53d65d6dff4680c14b" ON "user_documents" ("document_id") `
    );
    await queryRunner.query(
      `ALTER TABLE "user_documents" ADD CONSTRAINT "FK_aa4b82a9943c65b5f622a6925b2" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "user_documents" ADD CONSTRAINT "FK_7be233cb53d65d6dff4680c14bc" FOREIGN KEY ("document_id") REFERENCES "documents"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_documents" DROP CONSTRAINT "FK_7be233cb53d65d6dff4680c14bc"`
    );
    await queryRunner.query(
      `ALTER TABLE "user_documents" DROP CONSTRAINT "FK_aa4b82a9943c65b5f622a6925b2"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_7be233cb53d65d6dff4680c14b"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_aa4b82a9943c65b5f622a6925b"`
    );
    await queryRunner.query(`DROP TABLE "user_documents"`);
  }
}
