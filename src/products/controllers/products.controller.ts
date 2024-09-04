import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductPaginationDto } from '../dto/pagination.dto';
import { ProductPaginationResponse } from '../entities/pagination-response.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() dto: CreateProductDto) {
    try {
      return this.productsService.create(dto);
    } catch (error) {
      console.log(error);
    }
  }

  @Get()
  findAll(@Query() dto: ProductPaginationDto): Promise<ProductPaginationResponse> {
    try {
      return this.productsService.findAll(dto);
    } catch (error) {
      console.log(error);
    }
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    try {
      return this.productsService.findById(+id);
    } catch (error) {
      console.log('error ----->' + error);
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    try {
      return this.productsService.update(+id, dto);
    } catch (error) {
      console.log('error ----->' + error);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.productsService.remove(+id);
    } catch (error) {
      console.log(error);
    }
  }
}
