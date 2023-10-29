-- CreateTable
CREATE TABLE "Rentals" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "start_time" DATETIME NOT NULL,
    "end_time" DATETIME NOT NULL,
    "rental_amount" REAL NOT NULL
);
