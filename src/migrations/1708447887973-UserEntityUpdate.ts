import { MigrationInterface, QueryRunner } from "typeorm";

export class UserEntityUpdate1708447887973 implements MigrationInterface {
  name = "UserEntityUpdate1708447887973";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "name"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "is_active"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "is_deleted"`);
    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN "display_picture_url"`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "display_name" character varying NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "phone_number" character varying NOT NULL`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."users_status_enum" AS ENUM('active', 'inactive', 'deleted')`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "status" "public"."users_status_enum" NOT NULL DEFAULT 'active'`
    );
    await queryRunner.query(`ALTER TABLE "users" ADD "uid" character varying`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "is_system_generated" boolean NOT NULL DEFAULT false`
    );
    await queryRunner.query(`ALTER TABLE "users" ADD "otp" character varying`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "otp"`);
    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN "is_system_generated"`
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "uid"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "status"`);
    await queryRunner.query(`DROP TYPE "public"."users_status_enum"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone_number"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "display_name"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "display_picture_url" text`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "is_deleted" boolean NOT NULL DEFAULT false`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "is_active" boolean NOT NULL DEFAULT true`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "phone" character varying NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "name" character varying NOT NULL`
    );
  }
}
