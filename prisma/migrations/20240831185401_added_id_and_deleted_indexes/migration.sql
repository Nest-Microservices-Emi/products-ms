/*
  Warnings:

  - A unique constraint covering the columns `[id,deleted]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[deleted]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Product_id_deleted_key" ON "Product"("id", "deleted");

-- CreateIndex
CREATE UNIQUE INDEX "Product_deleted_key" ON "Product"("deleted");
