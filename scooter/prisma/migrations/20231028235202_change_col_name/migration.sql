/*
  Warnings:

  - You are about to drop the column `longitute` on the `Scooters` table. All the data in the column will be lost.
  - Added the required column `longitude` to the `Scooters` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Scooters" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "status" TEXT NOT NULL,
    "latitude" INTEGER NOT NULL,
    "longitude" INTEGER NOT NULL
);
INSERT INTO "new_Scooters" ("id", "latitude", "status") SELECT "id", "latitude", "status" FROM "Scooters";
DROP TABLE "Scooters";
ALTER TABLE "new_Scooters" RENAME TO "Scooters";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
