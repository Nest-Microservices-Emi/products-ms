import { IsNumber, IsString } from "class-validator";

export class CreateProductDto {
	@IsString()
	name: string;

	@IsNumber({maxDecimalPlaces: 4})
	price: number;
}
