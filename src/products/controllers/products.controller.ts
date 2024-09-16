import { Controller, Body, ParseIntPipe } from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductPaginationDto } from '../../common/pagination.dto';
import { ProductPaginationResponse } from '../entities/pagination-response.entity';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @MessagePattern({ cmd: 'create'})
  create(@Payload() dto: CreateProductDto) {
    try {
      return this.productsService.create(dto);
    } catch (error) {
      console.log(error);
    }
  }

  @MessagePattern({ cmd: 'findAll'})
  findAll(@Payload() dto: ProductPaginationDto): Promise<ProductPaginationResponse> {
    try {
      return this.productsService.findAll(dto);
    } catch (error) {
      console.log(error);
    }
  }

  @MessagePattern({ cmd: 'findById'})
  findById(@Payload('id', ParseIntPipe) id: number) {
    try {
      return this.productsService.findById(id);
    } catch (error) {
      console.log('error ----->' + error);
    }
  }

  @MessagePattern({ cmd: 'update'})
  update(@Body() dto: UpdateProductDto) {
    try {
      return this.productsService.update(dto.id, dto);
    } catch (error) {
      console.log('error ----->' + error);
    }
  }

  @MessagePattern({ cmd: 'remove'})
  remove(@Payload('id') id: string) {
    try {
      return this.productsService.remove(+id);
    } catch (error) {
      console.log(error);
    }
  }
}
