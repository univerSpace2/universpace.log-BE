import { MigrationInterface, QueryRunner } from "typeorm";

export class First1729843007579 implements MigrationInterface {
    name = 'First1729843007579'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categories" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "category" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "posts" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "content" text NOT NULL, "views" integer NOT NULL DEFAULT (0), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "categories_posts_posts" ("categoriesId" integer NOT NULL, "postsId" integer NOT NULL, PRIMARY KEY ("categoriesId", "postsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e24774f82f518838b1acbe7add" ON "categories_posts_posts" ("categoriesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_8a6e72a6e55b4cabe31d04975b" ON "categories_posts_posts" ("postsId") `);
        await queryRunner.query(`CREATE TABLE "posts_categories_categories" ("postsId" integer NOT NULL, "categoriesId" integer NOT NULL, PRIMARY KEY ("postsId", "categoriesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f50a96e3d32263cc97588d91d6" ON "posts_categories_categories" ("postsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_bb4ea8658b6d38df2a5f93cd50" ON "posts_categories_categories" ("categoriesId") `);
        await queryRunner.query(`DROP INDEX "IDX_e24774f82f518838b1acbe7add"`);
        await queryRunner.query(`DROP INDEX "IDX_8a6e72a6e55b4cabe31d04975b"`);
        await queryRunner.query(`CREATE TABLE "temporary_categories_posts_posts" ("categoriesId" integer NOT NULL, "postsId" integer NOT NULL, CONSTRAINT "FK_e24774f82f518838b1acbe7addb" FOREIGN KEY ("categoriesId") REFERENCES "categories" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_8a6e72a6e55b4cabe31d04975b4" FOREIGN KEY ("postsId") REFERENCES "posts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, PRIMARY KEY ("categoriesId", "postsId"))`);
        await queryRunner.query(`INSERT INTO "temporary_categories_posts_posts"("categoriesId", "postsId") SELECT "categoriesId", "postsId" FROM "categories_posts_posts"`);
        await queryRunner.query(`DROP TABLE "categories_posts_posts"`);
        await queryRunner.query(`ALTER TABLE "temporary_categories_posts_posts" RENAME TO "categories_posts_posts"`);
        await queryRunner.query(`CREATE INDEX "IDX_e24774f82f518838b1acbe7add" ON "categories_posts_posts" ("categoriesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_8a6e72a6e55b4cabe31d04975b" ON "categories_posts_posts" ("postsId") `);
        await queryRunner.query(`DROP INDEX "IDX_f50a96e3d32263cc97588d91d6"`);
        await queryRunner.query(`DROP INDEX "IDX_bb4ea8658b6d38df2a5f93cd50"`);
        await queryRunner.query(`CREATE TABLE "temporary_posts_categories_categories" ("postsId" integer NOT NULL, "categoriesId" integer NOT NULL, CONSTRAINT "FK_f50a96e3d32263cc97588d91d6e" FOREIGN KEY ("postsId") REFERENCES "posts" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_bb4ea8658b6d38df2a5f93cd506" FOREIGN KEY ("categoriesId") REFERENCES "categories" ("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("postsId", "categoriesId"))`);
        await queryRunner.query(`INSERT INTO "temporary_posts_categories_categories"("postsId", "categoriesId") SELECT "postsId", "categoriesId" FROM "posts_categories_categories"`);
        await queryRunner.query(`DROP TABLE "posts_categories_categories"`);
        await queryRunner.query(`ALTER TABLE "temporary_posts_categories_categories" RENAME TO "posts_categories_categories"`);
        await queryRunner.query(`CREATE INDEX "IDX_f50a96e3d32263cc97588d91d6" ON "posts_categories_categories" ("postsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_bb4ea8658b6d38df2a5f93cd50" ON "posts_categories_categories" ("categoriesId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_bb4ea8658b6d38df2a5f93cd50"`);
        await queryRunner.query(`DROP INDEX "IDX_f50a96e3d32263cc97588d91d6"`);
        await queryRunner.query(`ALTER TABLE "posts_categories_categories" RENAME TO "temporary_posts_categories_categories"`);
        await queryRunner.query(`CREATE TABLE "posts_categories_categories" ("postsId" integer NOT NULL, "categoriesId" integer NOT NULL, PRIMARY KEY ("postsId", "categoriesId"))`);
        await queryRunner.query(`INSERT INTO "posts_categories_categories"("postsId", "categoriesId") SELECT "postsId", "categoriesId" FROM "temporary_posts_categories_categories"`);
        await queryRunner.query(`DROP TABLE "temporary_posts_categories_categories"`);
        await queryRunner.query(`CREATE INDEX "IDX_bb4ea8658b6d38df2a5f93cd50" ON "posts_categories_categories" ("categoriesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_f50a96e3d32263cc97588d91d6" ON "posts_categories_categories" ("postsId") `);
        await queryRunner.query(`DROP INDEX "IDX_8a6e72a6e55b4cabe31d04975b"`);
        await queryRunner.query(`DROP INDEX "IDX_e24774f82f518838b1acbe7add"`);
        await queryRunner.query(`ALTER TABLE "categories_posts_posts" RENAME TO "temporary_categories_posts_posts"`);
        await queryRunner.query(`CREATE TABLE "categories_posts_posts" ("categoriesId" integer NOT NULL, "postsId" integer NOT NULL, PRIMARY KEY ("categoriesId", "postsId"))`);
        await queryRunner.query(`INSERT INTO "categories_posts_posts"("categoriesId", "postsId") SELECT "categoriesId", "postsId" FROM "temporary_categories_posts_posts"`);
        await queryRunner.query(`DROP TABLE "temporary_categories_posts_posts"`);
        await queryRunner.query(`CREATE INDEX "IDX_8a6e72a6e55b4cabe31d04975b" ON "categories_posts_posts" ("postsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_e24774f82f518838b1acbe7add" ON "categories_posts_posts" ("categoriesId") `);
        await queryRunner.query(`DROP INDEX "IDX_bb4ea8658b6d38df2a5f93cd50"`);
        await queryRunner.query(`DROP INDEX "IDX_f50a96e3d32263cc97588d91d6"`);
        await queryRunner.query(`DROP TABLE "posts_categories_categories"`);
        await queryRunner.query(`DROP INDEX "IDX_8a6e72a6e55b4cabe31d04975b"`);
        await queryRunner.query(`DROP INDEX "IDX_e24774f82f518838b1acbe7add"`);
        await queryRunner.query(`DROP TABLE "categories_posts_posts"`);
        await queryRunner.query(`DROP TABLE "posts"`);
        await queryRunner.query(`DROP TABLE "categories"`);
    }

}
