import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1770944767310 implements MigrationInterface {
    name = 'Init1770944767310'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` varchar(36) NOT NULL, \`email\` varchar(320) NOT NULL, \`first_name\` varchar(100) NOT NULL, \`second_name\` varchar(100) NULL, \`google_sub\` varchar(255) NULL, \`password_hash\` varchar(255) NULL, \`role\` enum ('user', 'admin', 'editor') NOT NULL DEFAULT 'user', \`is_email_verified\` tinyint NOT NULL DEFAULT 0, \`verification_token\` varchar(320) NULL, \`verification_expires\` datetime NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), UNIQUE INDEX \`IDX_68b61ba0fb359b93b517cf1073\` (\`google_sub\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_68b61ba0fb359b93b517cf1073\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
