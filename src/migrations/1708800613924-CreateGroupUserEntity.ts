import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateGroupUserEntity1708800613924 implements MigrationInterface {
    name = 'CreateGroupUserEntity1708800613924'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."group_users_role_enum" AS ENUM('admin', 'user')`);
        await queryRunner.query(`CREATE TYPE "public"."group_users_status_enum" AS ENUM('active', 'inactive', 'deleted')`);
        await queryRunner.query(`CREATE TABLE "group_users" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "created_by" integer, "updated_by" integer, "group_id" integer NOT NULL, "user_id" integer NOT NULL, "role" "public"."group_users_role_enum" NOT NULL, "added_by_user_id" integer NOT NULL, "added_at" TIMESTAMP WITH TIME ZONE NOT NULL, "removed_at" TIMESTAMP WITH TIME ZONE NOT NULL, "removed_by" integer NOT NULL, "status" "public"."group_users_status_enum" NOT NULL, CONSTRAINT "PK_5df8869cdeffc693bd083153bcf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_be6db0d7dabab05d97233d19f6" ON "group_users" ("group_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_eba8af4e65056abb4c5f62556c" ON "group_users" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_738451eb413c84098f86ad650b" ON "group_users" ("removed_by") `);
        await queryRunner.query(`ALTER TABLE "group_users" ADD CONSTRAINT "FK_be6db0d7dabab05d97233d19f61" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "group_users" ADD CONSTRAINT "FK_eba8af4e65056abb4c5f62556c6" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "group_users" ADD CONSTRAINT "FK_738451eb413c84098f86ad650ba" FOREIGN KEY ("removed_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "group_users" DROP CONSTRAINT "FK_738451eb413c84098f86ad650ba"`);
        await queryRunner.query(`ALTER TABLE "group_users" DROP CONSTRAINT "FK_eba8af4e65056abb4c5f62556c6"`);
        await queryRunner.query(`ALTER TABLE "group_users" DROP CONSTRAINT "FK_be6db0d7dabab05d97233d19f61"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_738451eb413c84098f86ad650b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_eba8af4e65056abb4c5f62556c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_be6db0d7dabab05d97233d19f6"`);
        await queryRunner.query(`DROP TABLE "group_users"`);
        await queryRunner.query(`DROP TYPE "public"."group_users_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."group_users_role_enum"`);
    }

}
