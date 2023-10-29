-- CreateTable
CREATE TABLE "Payments" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "card_number" INTEGER NOT NULL,
    "charged" BOOLEAN NOT NULL DEFAULT false
);
