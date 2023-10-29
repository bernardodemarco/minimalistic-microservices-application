/*
  Warnings:

  - Added the required column `transaction_id` to the `Rentals` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Rentals" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "start_time" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_time" DATETIME,
    "rental_amount" REAL NOT NULL,
    "scooter_id" INTEGER NOT NULL,
    "transaction_id" INTEGER NOT NULL
);
INSERT INTO "new_Rentals" ("end_time", "id", "rental_amount", "scooter_id", "start_time") SELECT "end_time", "id", "rental_amount", "scooter_id", "start_time" FROM "Rentals";
DROP TABLE "Rentals";
ALTER TABLE "new_Rentals" RENAME TO "Rentals";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
