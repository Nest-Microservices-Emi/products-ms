import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { PrismaService } from '../../../prisma/services/prisma.service';
import { PaginationDto } from '../../common/pagination.dto';
import { PaginationResponse } from '../../common/pagination-response.type';
import { RpcException } from '@nestjs/microservices';
import { Product } from '@prisma/client';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger('Products Service');

  constructor(private readonly prismaService: PrismaService) {}

  public async create(dto: CreateProductDto) {
    return await this.prismaService.product.create({
      data: dto,
    });
  }

  public async findAll(dto: PaginationDto): Promise<PaginationResponse<Product>> {
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
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message:`Product with id ${id} not found.`
      });
    }

    return product;
  }

  public async update(id: number, dto: UpdateProductDto) {
    const { id: __, ...data} = dto;

    await this.findById(id);

    return this.prismaService.product.update({
      where: {
        id,
        deleted: false,
      },
      data,
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
