/*
  Warnings:

  - You are about to drop the column `nome` on the `Users` table. All the data in the column will be lost.
  - Added the required column `name` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Users" (
    "cpf" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL
);
INSERT INTO "new_Users" ("cpf", "email", "phone_number") SELECT "cpf", "email", "phone_number" FROM "Users";
DROP TABLE "Users";
ALTER TABLE "new_Users" RENAME TO "Users";
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
CREATE UNIQUE INDEX "Users_phone_number_key" ON "Users"("phone_number");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
