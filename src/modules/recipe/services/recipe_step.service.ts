import { Injectable } from '@nestjs/common';
import { RecipeStep } from '@prisma/client';
import { BaseService } from 'src/base/base.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RecipeStepService extends BaseService<RecipeStep> {
  constructor (protected prisma: PrismaService) {
    super(prisma, 'recipe_step')
  }
}
