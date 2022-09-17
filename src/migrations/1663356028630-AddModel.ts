import { MigrationInterface, QueryRunner } from "typeorm";

export class AddModel1663356028630 implements MigrationInterface {
    name = 'AddModel1663356028630'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`image\` (\`id\` int NOT NULL AUTO_INCREMENT, \`url\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`lastModified\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userId\` int NOT NULL, \`new\` tinyint NOT NULL, \`deleted\` tinyint NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_image\` (\`userId\` int NOT NULL, \`imageId\` int NOT NULL, INDEX \`IDX_bbbdf8daa06964389b3f90b9c2\` (\`userId\`), INDEX \`IDX_f12654727f1c6616ee50d84b23\` (\`imageId\`), PRIMARY KEY (\`userId\`, \`imageId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`image\` ADD CONSTRAINT \`FK_dc40417dfa0c7fbd70b8eb880cc\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_image\` ADD CONSTRAINT \`FK_bbbdf8daa06964389b3f90b9c2b\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`user_image\` ADD CONSTRAINT \`FK_f12654727f1c6616ee50d84b234\` FOREIGN KEY (\`imageId\`) REFERENCES \`image\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_image\` DROP FOREIGN KEY \`FK_f12654727f1c6616ee50d84b234\``);
        await queryRunner.query(`ALTER TABLE \`user_image\` DROP FOREIGN KEY \`FK_bbbdf8daa06964389b3f90b9c2b\``);
        await queryRunner.query(`ALTER TABLE \`image\` DROP FOREIGN KEY \`FK_dc40417dfa0c7fbd70b8eb880cc\``);
        await queryRunner.query(`DROP INDEX \`IDX_f12654727f1c6616ee50d84b23\` ON \`user_image\``);
        await queryRunner.query(`DROP INDEX \`IDX_bbbdf8daa06964389b3f90b9c2\` ON \`user_image\``);
        await queryRunner.query(`DROP TABLE \`user_image\``);
        await queryRunner.query(`DROP TABLE \`image\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
