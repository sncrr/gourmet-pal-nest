import { InternalServerErrorException } from "@nestjs/common";

export class BaseController <T> {

  constructor(
    protected service: any,
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