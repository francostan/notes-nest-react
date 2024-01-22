-- CreateTable
CREATE TABLE "Note" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "tags" TEXT[],
    "email" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "categories" TEXT[],

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);
