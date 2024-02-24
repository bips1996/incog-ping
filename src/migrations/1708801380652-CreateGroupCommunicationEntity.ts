import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateGroupCommunicationEntity1708801380652 implements MigrationInterface {
    name = 'CreateGroupCommunicationEntity1708801380652'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."group_communications_delivery_status_enum" AS ENUM('failed', 'sent', 'received', 'seen')`);
        await queryRunner.query(`CREATE TABLE "group_communications" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "created_by" integer, "updated_by" integer, "group_id" integer NOT NULL, "sender_group_user_id" integer NOT NULL, "group_document_id" integer NOT NULL, "send_at" TIMESTAMP WITH TIME ZONE NOT NULL, "delivery_status" "public"."group_communications_delivery_status_enum" NOT NULL, CONSTRAINT "PK_9aeb648387a25724837805db5e7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3fc9672a1b2dbd65e16dfae449" ON "group_communications" ("group_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_5119c2a69647898ad2990b8ea5" ON "group_communications" ("sender_group_user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_6525c2169c40201e9dab85d651" ON "group_communications" ("group_document_id") `);
        await queryRunner.query(`ALTER TABLE "group_communications" ADD CONSTRAINT "FK_3fc9672a1b2dbd65e16dfae4494" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "group_communications" ADD CONSTRAINT "FK_5119c2a69647898ad2990b8ea57" FOREIGN KEY ("sender_group_user_id") REFERENCES "group_users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "group_communications" ADD CONSTRAINT "FK_6525c2169c40201e9dab85d651c" FOREIGN KEY ("group_document_id") REFERENCES "group_media_documents"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "group_communications" DROP CONSTRAINT "FK_6525c2169c40201e9dab85d651c"`);
        await queryRunner.query(`ALTER TABLE "group_communications" DROP CONSTRAINT "FK_5119c2a69647898ad2990b8ea57"`);
        await queryRunner.query(`ALTER TABLE "group_communications" DROP CONSTRAINT "FK_3fc9672a1b2dbd65e16dfae4494"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6525c2169c40201e9dab85d651"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5119c2a69647898ad2990b8ea5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3fc9672a1b2dbd65e16dfae449"`);
        await queryRunner.query(`DROP TABLE "group_communications"`);
        await queryRunner.query(`DROP TYPE "public"."group_communications_delivery_status_enum"`);
    }

}
