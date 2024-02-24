import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateGroupMediaDocumentEntity1708799748002 implements MigrationInterface {
    name = 'UpdateGroupMediaDocumentEntity1708799748002'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "group_media_documents" ADD "uploaded_at" TIMESTAMP WITH TIME ZONE NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "group_media_documents" DROP COLUMN "uploaded_at"`);
    }

}
