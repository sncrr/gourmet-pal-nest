import { Injectable } from '@nestjs/common';
import { RecipeIngredient } from '@prisma/client';
import { BaseService } from 'src/base/base.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RecipeIngredientService extends BaseService<RecipeIngredient> {
  constructor (protected prisma: PrismaService) {
    super(prisma, 'recipe_ingredient')
  }
}
