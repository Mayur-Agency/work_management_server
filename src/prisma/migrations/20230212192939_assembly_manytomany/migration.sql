/*
  Warnings:

  - The primary key for the `Assembly` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `date_assigned` on the `Assembly` table. All the data in the column will be lost.
  - You are about to drop the column `date_completed` on the `Assembly` table. All the data in the column will be lost.
  - The `id` column on the `Assembly` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `RawMaterial` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `date_added` on the `RawMaterial` table. All the data in the column will be lost.
  - The `id` column on the `RawMaterial` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Worker` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Worker` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `AssemblyRawMaterial` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `RawMaterial` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Worker` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `dateAssigned` to the `Assembly` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateCompleted` to the `Assembly` table without a default value. This is not possible if the table is not empty.
  - Made the column `completed` on table `Assembly` required. This step will fail if there are existing NULL values in that column.
  - Changed the type of `workerId` on the `Assembly` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `address` on table `Worker` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Assembly" DROP CONSTRAINT "Assembly_workerId_fkey";

-- DropForeignKey
ALTER TABLE "AssemblyRawMaterial" DROP CONSTRAINT "AssemblyRawMaterial_assemblyId_fkey";

-- DropForeignKey
ALTER TABLE "AssemblyRawMaterial" DROP CONSTRAINT "AssemblyRawMaterial_rawMaterialId_fkey";

-- DropIndex
DROP INDEX "Assembly_id_key";

-- DropIndex
DROP INDEX "RawMaterial_id_key";

-- DropIndex
DROP INDEX "Worker_id_key";

-- DropIndex
DROP INDEX "Worker_phone_key";

-- AlterTable
ALTER TABLE "Assembly" DROP CONSTRAINT "Assembly_pkey",
DROP COLUMN "date_assigned",
DROP COLUMN "date_completed",
ADD COLUMN     "dateAssigned" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "dateCompleted" TIMESTAMP(3) NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "completed" SET NOT NULL,
DROP COLUMN "workerId",
ADD COLUMN     "workerId" INTEGER NOT NULL,
ADD CONSTRAINT "Assembly_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "RawMaterial" DROP CONSTRAINT "RawMaterial_pkey",
DROP COLUMN "date_added",
ADD COLUMN     "dateAdded" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "RawMaterial_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Worker" DROP CONSTRAINT "Worker_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "address" SET NOT NULL,
ADD CONSTRAINT "Worker_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "AssemblyRawMaterial";

-- CreateTable
CREATE TABLE "RawMaterialAssembly" (
    "id" SERIAL NOT NULL,
    "assemblyId" INTEGER NOT NULL,
    "rawMaterialId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "RawMaterialAssembly_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RawMaterial_name_key" ON "RawMaterial"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Worker_name_key" ON "Worker"("name");

-- AddForeignKey
ALTER TABLE "Assembly" ADD CONSTRAINT "Assembly_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "Worker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RawMaterialAssembly" ADD CONSTRAINT "RawMaterialAssembly_assemblyId_fkey" FOREIGN KEY ("assemblyId") REFERENCES "Assembly"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RawMaterialAssembly" ADD CONSTRAINT "RawMaterialAssembly_rawMaterialId_fkey" FOREIGN KEY ("rawMaterialId") REFERENCES "RawMaterial"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
