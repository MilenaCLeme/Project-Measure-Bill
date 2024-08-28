-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL,
    "cpf" VARCHAR(15) NOT NULL,
    "name" VARCHAR(250) NOT NULL,
    "hashedPassword" VARCHAR(150) NOT NULL
);

-- CreateTable
CREATE TABLE "measure" (
    "measure_uuid" TEXT NOT NULL,
    "measure_datetime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "meadure_type" TEXT NOT NULL,
    "has_confirmed" BOOLEAN NOT NULL DEFAULT false,
    "image_url" TEXT NOT NULL,
    "customer_code" UUID
);

-- CreateIndex
CREATE UNIQUE INDEX "user_id_key" ON "user"("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_cpf_key" ON "user"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "measure_measure_uuid_key" ON "measure"("measure_uuid");

-- AddForeignKey
ALTER TABLE "measure" ADD CONSTRAINT "measure_customer_code_fkey" FOREIGN KEY ("customer_code") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
