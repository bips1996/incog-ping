import { MigrationInterface, QueryRunner } from "typeorm";

export class Document1708448842148 implements MigrationInterface {
    name = 'Document1708448842148'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."documents_store_type_enum" AS ENUM('s3', 'local', 'db')`);
        await queryRunner.query(`CREATE TABLE "documents" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "created_by" integer, "updated_by" integer, "file_name" character varying NOT NULL, "file_type" character varying NOT NULL, "document_type_id" integer NOT NULL, "uploaded_on" TIMESTAMP NOT NULL, "user_id" integer NOT NULL, "store_type" "public"."documents_store_type_enum" NOT NULL DEFAULT 'db', "file_stream" character varying, "object_key" character varying, "userId" integer, "documentTypeId" integer, CONSTRAINT "PK_ac51aa5181ee2036f5ca482857c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "documents" ADD CONSTRAINT "FK_e300b5c2e3fefa9d6f8a3f25975" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "documents" ADD CONSTRAINT "FK_6c6b9775baa0c8973bd829a8e46" FOREIGN KEY ("documentTypeId") REFERENCES "document_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "documents" DROP CONSTRAINT "FK_6c6b9775baa0c8973bd829a8e46"`);
        await queryRunner.query(`ALTER TABLE "documents" DROP CONSTRAINT "FK_e300b5c2e3fefa9d6f8a3f25975"`);
        await queryRunner.query(`DROP TABLE "documents"`);
        await queryRunner.query(`DROP TYPE "public"."documents_store_type_enum"`);
    }

}
