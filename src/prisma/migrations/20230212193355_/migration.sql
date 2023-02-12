/*
  Warnings:

  - The primary key for the `Assembly` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `RawMaterial` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `RawMaterialAssembly` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Worker` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Assembly" DROP CONSTRAINT "Assembly_workerId_fkey";

-- DropForeignKey
ALTER TABLE "RawMaterialAssembly" DROP CONSTRAINT "RawMaterialAssembly_assemblyId_fkey";

-- DropForeignKey
ALTER TABLE "RawMaterialAssembly" DROP CONSTRAINT "RawMaterialAssembly_rawMaterialId_fkey";

-- AlterTable
ALTER TABLE "Assembly" DROP CONSTRAINT "Assembly_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "workerId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Assembly_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Assembly_id_seq";

-- AlterTable
ALTER TABLE "RawMaterial" DROP CONSTRAINT "RawMaterial_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "RawMaterial_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "RawMaterial_id_seq";

-- AlterTable
ALTER TABLE "RawMaterialAssembly" DROP CONSTRAINT "RawMaterialAssembly_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "assemblyId" SET DATA TYPE TEXT,
ALTER COLUMN "rawMaterialId" SET DATA TYPE TEXT,
ADD CONSTRAINT "RawMaterialAssembly_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "RawMaterialAssembly_id_seq";

-- AlterTable
ALTER TABLE "Worker" DROP CONSTRAINT "Worker_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Worker_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Worker_id_seq";

-- AddForeignKey
ALTER TABLE "Assembly" ADD CONSTRAINT "Assembly_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "Worker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RawMaterialAssembly" ADD CONSTRAINT "RawMaterialAssembly_assemblyId_fkey" FOREIGN KEY ("assemblyId") REFERENCES "Assembly"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RawMaterialAssembly" ADD CONSTRAINT "RawMaterialAssembly_rawMaterialId_fkey" FOREIGN KEY ("rawMaterialId") REFERENCES "RawMaterial"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
