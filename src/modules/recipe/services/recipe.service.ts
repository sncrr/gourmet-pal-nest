import { Injectable } from '@nestjs/common';
import { Prisma, Recipe } from '@prisma/client';
import { BaseService } from 'src/base/base.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRecipePayload } from '../recipe.types';
import { PageParams, PaginatedResult, PaginateFunction, paginator } from 'src/utils/paginator';

const paginate: PaginateFunction = paginator({});
@Injectable()
export class RecipeService extends BaseService<Recipe> {
  constructor (protected prisma: PrismaService) {
    super(prisma, 'recipe')
  }

  async createRecipe (payload: Prisma.RecipeUncheckedCreateInput) {
    return await this.create(payload);
  }

  async findRecipes (params: {
    page?: PageParams,
    where?: Prisma.RecipeWhereInput,
    select?: Prisma.RecipeSelect,
    include?: Prisma.RecipeInclude
  }): Promise<PaginatedResult<Recipe>> {

    return paginate(
      this.prisma.recipe,
      {
        where: params.where,
        select: params.select,
        include: params.include
      },
      params.page
    )
  }

  async findRecipe (params: {
    where?: Prisma.RecipeWhereInput,
    select?: Prisma.RecipeSelect,
    include?: Prisma.RecipeInclude
  }) {
    return await this.findOne(params);
  }
}
