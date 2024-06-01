import { Module } from '@nestjs/common';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './services/recipe.service';
import { RecipeImageService } from './services/recipe_image.service';
import { RecipeIngredientService } from './services/recipe_ingredient.service';
import { RecipeStepService } from './services/recipe_step.service';
import { IngredientService } from '../../ingredient/ingredient.service';

@Module({
  controllers: [RecipeController],
  providers: [
    RecipeService,
    RecipeImageService,
    RecipeIngredientService,
    RecipeStepService,
    IngredientService,
  ]
})
export class RecipeModule {}
