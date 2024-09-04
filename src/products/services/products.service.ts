import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { PrismaService } from '../../../prisma/services/prisma.service';
import { ProductPaginationDto } from '../dto/pagination.dto';
import { ProductPaginationResponse } from '../entities/pagination-response.entity';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger('Products Service');

  constructor(private readonly prismaService: PrismaService) {}

  public async create(dto: CreateProductDto) {
    return await this.prismaService.product.create({
      data: dto,
    });
  }

  public async findAll(dto: ProductPaginationDto): Promise<ProductPaginationResponse> {
    const { page, limit } = dto;
    const totalPages = await this.prismaService.product.count({ where: { deleted: false }});
    const lastPage = Math.ceil( totalPages / limit );

    const data = await this.prismaService.product.findMany({
      skip: (page -1) * limit,
      take: limit,
      where: { deleted: false },
    });

    return {
      data,
      metadata: {
        totalPages,
        actualPage: page,
        lastPage
      }
    }
  }

  public async findById(id: number) {
    const product = await this.prismaService.product.findUnique({
      where: {
        id,
        deleted: false,
      }
    });
    if(!product) {
      throw new NotFoundException(`Product with id ${id} not found.`);
    }

    return product;
  }

  public async update(id: number, dto: UpdateProductDto) {
    await this.findById(id);

    return this.prismaService.product.update({
      where: {
        id,
        deleted: false,
      },
      data: dto,
    }) 
  }

  public async remove(id: number) {
    await this.findById(id);

    const product = await this.prismaService.product.update({
      where: { id },
      data: { deleted: true },
    });

    return product;
  }
}
