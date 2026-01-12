import { MigrationInterface, QueryRunner } from "typeorm";

export class MediaFieldForDestinations1768238677877 implements MigrationInterface {
    name = 'MediaFieldForDestinations1768238677877'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "destination" ADD "media" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "destination" DROP COLUMN "media"`);
    }

}
