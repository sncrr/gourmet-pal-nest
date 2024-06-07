import { InternalServerErrorException, UnprocessableEntityException } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

export class BaseService<T> {

  constructor(
    protected prisma: PrismaService,
    protected model: string,
  ) { }

  protected async findMany(params: {
    where?: any,
    select?: any,
    include?: any,
  }): Promise<T[]> {

    let result = [];

    await this.prisma[this.model]
      .findMany(params)
      .then((res: T[]) => {
        result = res;
      })
      .catch((error: any) => {
        this.throwError(error)
      });

    return result;
  }

  protected async findOne(params: {
    where?: any,
    select?: any,
    include?: any,
  }): Promise<T> {
    let result = null;

    await this.prisma[this.model]
      .findUnique(params)
      .then((res: T) => {
        result = res;
      })
      .catch((error: any) => {
        this.throwError(error)
      });

    return result;
  }

  protected async create(data: any): Promise<T> {

    let result = null;

    await this.prisma[this.model]
      .create({
        data
      })
      .then((res: T) => {
        result = res;
      })
      .catch((error: any) => {
        this.throwError(error)
      });
      
    return result;
  }

  protected async update(params: {
    where: any,
    data: any,
  }): Promise<T> {

    let { where, data } = params;
    let result = null;

    await this.prisma[this.model]
      .update({
        data,
        where
      })
      .then((res: T) => {
        result = res;
      })
      .catch((error: any) => {
        this.throwError(error)
      });

    return result;
  }

  protected async delete(params: {
    where: any,
  }): Promise<T> {

    let result = null;

    await this.prisma[this.model]
      .delete(params)
      .then((res: T) => {
        result = res;
      })
      .catch((error: any) => {
        this.throwError(error)
      });

    return result;
  }

  protected throwError(error: any) {
    if(error instanceof Prisma.PrismaClientKnownRequestError) {
      if(error.code == 'P2002') {
        throw new UnprocessableEntityException(error.message);
      }
      else {
        console.error("PrismaClientKnownRequestError: ", `CODE: ${error.code} | ${error.message}`);
      }
    }
    else {
      throw new InternalServerErrorException(error.message)
    }
  }
}