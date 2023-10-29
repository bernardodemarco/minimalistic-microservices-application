-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Payments" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "card_number" TEXT NOT NULL,
    "charged" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Payments" ("card_number", "charged", "id") SELECT "card_number", "charged", "id" FROM "Payments";
DROP TABLE "Payments";
ALTER TABLE "new_Payments" RENAME TO "Payments";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
