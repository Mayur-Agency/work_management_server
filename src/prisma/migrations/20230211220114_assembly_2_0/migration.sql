/*
  Warnings:

  - You are about to drop the column `assemblyId` on the `RawMaterial` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "RawMaterial" DROP CONSTRAINT "RawMaterial_assemblyId_fkey";

-- AlterTable
ALTER TABLE "RawMaterial" DROP COLUMN "assemblyId";

-- CreateTable
CREATE TABLE "AssemblyRawMaterial" (
    "id" TEXT NOT NULL,
    "assemblyId" TEXT NOT NULL,
    "rawMaterialId" TEXT NOT NULL,

    CONSTRAINT "AssemblyRawMaterial_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AssemblyRawMaterial_id_key" ON "AssemblyRawMaterial"("id");

-- AddForeignKey
ALTER TABLE "AssemblyRawMaterial" ADD CONSTRAINT "AssemblyRawMaterial_assemblyId_fkey" FOREIGN KEY ("assemblyId") REFERENCES "Assembly"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssemblyRawMaterial" ADD CONSTRAINT "AssemblyRawMaterial_rawMaterialId_fkey" FOREIGN KEY ("rawMaterialId") REFERENCES "RawMaterial"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
