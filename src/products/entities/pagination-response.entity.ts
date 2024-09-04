import { Product } from "./product.entity";

export type ProductPaginationResponse = {
	data: Product[];
	metadata: {
		totalPages: number;
		actualPage: number;
		lastPage: number;
	}
}