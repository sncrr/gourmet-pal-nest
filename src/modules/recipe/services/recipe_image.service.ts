import { Injectable } from '@nestjs/common';
import { Recipe, RecipeImage } from '@prisma/client';
import { BaseService } from 'src/base/base.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RecipeImageService extends BaseService<RecipeImage> {
  constructor (protected prisma: PrismaService) {
    super(prisma, 'recipe_image')
  }
}
