import { Get, InternalServerErrorException, Param } from "@nestjs/common";
import { BaseService } from "./base.service";

export class BaseController <T> {

  constructor(
    protected service: BaseService<T>,
  ) {}

  protected throwError = {
    internalServer: (message: string) => {
      throw new InternalServerErrorException(message);
    }
  }

  // @Get('/')
  // async getList (
  //   @Param() params: any
  // ): Promise<Model[]> {
  //   let items: Model[] = [];
  //   return items;
  // }

  // @Get('/id/:id')
  // async getById (

  // ): Promise<Model> {
  //   let item: Model = null;
  //   return item;
  // }


}