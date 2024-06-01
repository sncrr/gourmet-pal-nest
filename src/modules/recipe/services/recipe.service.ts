import { Injectable } from '@nestjs/common';
import { Prisma, Recipe } from '@prisma/client';
import { BaseService } from 'src/base/base.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRecipePayload } from '../recipe.types';

@Injectable()
export class RecipeService extends BaseService<Recipe> {
  constructor (protected prisma: PrismaService) {
    super(prisma, 'recipe')
  }

  async createRecipe (payload: Prisma.RecipeUncheckedCreateInput) {
    return await this.create(payload);
  }

  async findRecipes (params: {
    where?: Prisma.RecipeWhereInput,
    select?: Prisma.RecipeSelect,
    include?: Prisma.RecipeInclude
  }) {
    return await this.findMany(params);
  }

  async findRecipe (params: {
    where?: Prisma.RecipeWhereInput,
    select?: Prisma.RecipeSelect,
    include?: Prisma.RecipeInclude
  }) {
    return await this.findOne(params);
  }
}
