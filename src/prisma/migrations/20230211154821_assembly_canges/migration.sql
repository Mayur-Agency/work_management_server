-- CreateTable
CREATE TABLE "Worker" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT,

    CONSTRAINT "Worker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Assembly" (
    "id" TEXT NOT NULL,
    "date_assigned" TIMESTAMP(3) NOT NULL,
    "date_completed" TIMESTAMP(3),
    "completed" BOOLEAN,
    "workerId" TEXT NOT NULL,

    CONSTRAINT "Assembly_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RawMaterial" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "date_added" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assemblyId" TEXT,

    CONSTRAINT "RawMaterial_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Worker_id_key" ON "Worker"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Worker_phone_key" ON "Worker"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Assembly_id_key" ON "Assembly"("id");

-- CreateIndex
CREATE UNIQUE INDEX "RawMaterial_id_key" ON "RawMaterial"("id");

-- AddForeignKey
ALTER TABLE "Assembly" ADD CONSTRAINT "Assembly_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "Worker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RawMaterial" ADD CONSTRAINT "RawMaterial_assemblyId_fkey" FOREIGN KEY ("assemblyId") REFERENCES "Assembly"("id") ON DELETE SET NULL ON UPDATE CASCADE;
