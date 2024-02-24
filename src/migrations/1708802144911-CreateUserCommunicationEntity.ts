import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserCommunicationEntity1708802144911 implements MigrationInterface {
    name = 'CreateUserCommunicationEntity1708802144911'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_communications_delivery_status_enum" AS ENUM('failed', 'sent', 'received', 'seen')`);
        await queryRunner.query(`CREATE TABLE "user_communications" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "created_by" integer, "updated_by" integer, "sender_user_id" integer NOT NULL, "recipient_user_id" integer NOT NULL, "message" character varying NOT NULL, "user_document_id" integer NOT NULL, "send_at" TIMESTAMP WITH TIME ZONE NOT NULL, "received_at" TIMESTAMP WITH TIME ZONE NOT NULL, "seen_at" TIMESTAMP WITH TIME ZONE NOT NULL, "delivery_status" "public"."user_communications_delivery_status_enum" NOT NULL, CONSTRAINT "PK_ce3a8ef703a21b1c764aa524fa8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_0076f9bbfa235ce9c1aefe9ff9" ON "user_communications" ("sender_user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_e26329fab532183082bc104a8e" ON "user_communications" ("recipient_user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_5c057ba00fbebbaf766c71be0a" ON "user_communications" ("user_document_id") `);
        await queryRunner.query(`ALTER TABLE "user_communications" ADD CONSTRAINT "FK_0076f9bbfa235ce9c1aefe9ff9b" FOREIGN KEY ("sender_user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_communications" ADD CONSTRAINT "FK_e26329fab532183082bc104a8e9" FOREIGN KEY ("recipient_user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_communications" ADD CONSTRAINT "FK_5c057ba00fbebbaf766c71be0ad" FOREIGN KEY ("user_document_id") REFERENCES "user_documents"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_communications" DROP CONSTRAINT "FK_5c057ba00fbebbaf766c71be0ad"`);
        await queryRunner.query(`ALTER TABLE "user_communications" DROP CONSTRAINT "FK_e26329fab532183082bc104a8e9"`);
        await queryRunner.query(`ALTER TABLE "user_communications" DROP CONSTRAINT "FK_0076f9bbfa235ce9c1aefe9ff9b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5c057ba00fbebbaf766c71be0a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e26329fab532183082bc104a8e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0076f9bbfa235ce9c1aefe9ff9"`);
        await queryRunner.query(`DROP TABLE "user_communications"`);
        await queryRunner.query(`DROP TYPE "public"."user_communications_delivery_status_enum"`);
    }

}
