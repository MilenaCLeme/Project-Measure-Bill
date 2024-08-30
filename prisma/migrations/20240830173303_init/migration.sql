-- CreateTable
CREATE TABLE "measure" (
    "measure_uuid" TEXT NOT NULL,
    "measure_datetime" TIMESTAMP(3) NOT NULL,
    "measure_type" TEXT NOT NULL,
    "measure_value" INTEGER NOT NULL,
    "has_confirmed" BOOLEAN NOT NULL DEFAULT false,
    "image_url" TEXT NOT NULL,
    "customer_code" UUID
);

-- CreateIndex
CREATE UNIQUE INDEX "measure_measure_uuid_key" ON "measure"("measure_uuid");
