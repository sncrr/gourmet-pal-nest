import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

export class BaseService<T> {

  constructor(
    protected prisma: PrismaService,
    protected model: string,
  ) {}

  protected async findMany(params: {
    where?: any, 
    select?: any,
    include?: any,
  }): Promise<T[]> {
    let items = await this.prisma[this.model].findMany(params);

    if(items) {
      return items;
    }

    return [];
  }

  protected async findOne(params: {
    where?: any, 
    select?: any,
    include?: any,
  }): Promise<T> {
    let item = await this.prisma[this.model].findUnique(params);
    
    if(item) {
      return item;
    }

    return null;
  }

  protected async create(data: any): Promise<T> {
    return this.prisma[this.model].create({
      data
    });
  }

  protected async update(params: {
    where: any,
    data: any,
  }): Promise<T> {
    const { where, data } = params;
    return this.prisma[this.model].update({
      data,
      where
    });
  }

  protected async delete(params: {
    where: any,
  }): Promise<T> {
    return this.prisma[this.model].delete(params);
  }
}