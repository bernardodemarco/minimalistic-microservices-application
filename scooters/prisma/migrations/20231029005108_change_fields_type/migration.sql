/*
  Warnings:

  - You are about to alter the column `latitude` on the `Scooters` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - You are about to alter the column `longitude` on the `Scooters` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Scooters" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "status" TEXT NOT NULL,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL
);
INSERT INTO "new_Scooters" ("id", "latitude", "longitude", "status") SELECT "id", "latitude", "longitude", "status" FROM "Scooters";
DROP TABLE "Scooters";
ALTER TABLE "new_Scooters" RENAME TO "Scooters";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
