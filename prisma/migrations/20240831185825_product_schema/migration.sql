-- DropIndex
DROP INDEX "Product_deleted_key";

-- CreateIndex
CREATE INDEX "Product_id_deleted_idx" ON "Product"("id", "deleted");

-- CreateIndex
CREATE INDEX "Product_deleted_idx" ON "Product"("deleted");
