import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1771271835145 implements MigrationInterface {
    name = 'Init1771271835145'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`refresh_token_hash\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`last_login\` datetime NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`last_login\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`refresh_token_hash\``);
    }

}
