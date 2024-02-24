import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateGroupMediaDocumentEntity1708799416870 implements MigrationInterface {
    name = 'CreateGroupMediaDocumentEntity1708799416870'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "group_media_documents" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "created_by" integer, "updated_by" integer, "group_id" integer NOT NULL, "uploaded_by_user_id" integer NOT NULL, "document_id" integer NOT NULL, CONSTRAINT "PK_f7d6ebdb2a98c1eb1fcef88c5d4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_30a6133f147e108c022ddb19d7" ON "group_media_documents" ("group_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_c901f9d860bd057a0c6fa7fedf" ON "group_media_documents" ("uploaded_by_user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_d77707a722f4193330f7e40318" ON "group_media_documents" ("document_id") `);
        await queryRunner.query(`ALTER TABLE "group_media_documents" ADD CONSTRAINT "FK_30a6133f147e108c022ddb19d79" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "group_media_documents" ADD CONSTRAINT "FK_c901f9d860bd057a0c6fa7fedf6" FOREIGN KEY ("uploaded_by_user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "group_media_documents" ADD CONSTRAINT "FK_d77707a722f4193330f7e40318c" FOREIGN KEY ("document_id") REFERENCES "documents"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "group_media_documents" DROP CONSTRAINT "FK_d77707a722f4193330f7e40318c"`);
        await queryRunner.query(`ALTER TABLE "group_media_documents" DROP CONSTRAINT "FK_c901f9d860bd057a0c6fa7fedf6"`);
        await queryRunner.query(`ALTER TABLE "group_media_documents" DROP CONSTRAINT "FK_30a6133f147e108c022ddb19d79"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d77707a722f4193330f7e40318"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c901f9d860bd057a0c6fa7fedf"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_30a6133f147e108c022ddb19d7"`);
        await queryRunner.query(`DROP TABLE "group_media_documents"`);
    }

}
