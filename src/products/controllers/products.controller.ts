import { Controller, Body, ParseIntPipe } from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { PaginationDto } from '../../common/pagination.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @MessagePattern({ cmd: 'createProduct'})
  create(@Payload() dto: CreateProductDto) {
    try {
      return this.productsService.create(dto);
    } catch (error) {
      console.log(error);
    }
  }

  @MessagePattern({ cmd: 'findAllProducts'})
  findAll(@Payload() dto: PaginationDto) {
    try {
      return this.productsService.findAll(dto);
    } catch (error) {
      console.log(error);
    }
  }

  @MessagePattern({ cmd: 'findProductById'})
  findById(@Payload('id', ParseIntPipe) id: number) {
    try {
      return this.productsService.findById(id);
    } catch (error) {
      console.log('error ----->' + error);
    }
  }

  @MessagePattern({ cmd: 'updateProduct'})
  update(@Body() dto: UpdateProductDto) {
    try {
      return this.productsService.update(dto.id, dto);
    } catch (error) {
      console.log('error ----->' + error);
    }
  }

  @MessagePattern({ cmd: 'removeProduct'})
  remove(@Payload('id') id: string) {
    try {
      return this.productsService.remove(+id);
    } catch (error) {
      console.log(error);
    }
  }

  @MessagePattern({ cmd: 'validateProducts' })
  validateProducts(@Payload('ids') ids: number[]) {
    try {
      return this.productsService.validateProducts(ids);
    } catch (error) {
      console.log(error);
    }
  }
}
