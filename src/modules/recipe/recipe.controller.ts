import { Body, Controller, Get, InternalServerErrorException, Param, Post, Request, UseGuards } from '@nestjs/common';
import { RecipeService } from './services/recipe.service';
import { RecipeIngredientService } from './services/recipe_ingredient.service';
import { RecipeStepService } from './services/recipe_step.service';
import { RecipeImageService } from './services/recipe_image.service';
import { CreateRecipePayload } from './recipe.types';
import { Prisma, Recipe, User } from '@prisma/client';
import { IngredientService } from '../../ingredient/ingredient.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthService } from '../auth/auth.service';

@Controller('api/recipe')
export class RecipeController {
  constructor(
    protected recipeService: RecipeService,
    protected recIngredientService: RecipeIngredientService,
    protected recStepService: RecipeStepService,
    protected recImageService: RecipeImageService,
    protected ingredientService: IngredientService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('/')
  async createRecipe(
    @Request() req: any,
    @Body() body: CreateRecipePayload
  ): Promise<Recipe> {

    try {
      
      let ingredients = await this.ingredientService.checkIngredients(body.ingredients);
    
      let recipeData: Prisma.RecipeUncheckedCreateInput = {
        ...body,
        user_id: req.user.userId,
        steps: {
          create: body.steps
        },
        ingredients: {
          create: ingredients
        }
      };
  
      let recipe = this.recipeService.createRecipe(recipeData);
      return recipe;
    }
    catch(error) {
      console.error(error);
      throw new InternalServerErrorException(error.message)
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/mine')
  async getUserRecipes(
    @Request() req: any
  ): Promise<Recipe[]> {

    try {
     let recipes = this.recipeService.findRecipes({
      where: {
        user_id: req.user.userId,
      },
      include: {
        ingredients: true,
        steps: true,
      }
     });
     return recipes;
    }
    catch(error) {
      console.error(error);
      throw new InternalServerErrorException(error.message)
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/mine/:id')
  async getUserRecipeById(
    @Request() req: any,
    @Param('id') recipeId: string
  ): Promise<Recipe> {

    try {
     let recipe = this.recipeService.findRecipe({
      where: {
        user_id: req.user.userId,
        id: parseInt(recipeId),
      },
      include: {
        ingredients: true,
        steps: true,
      }
     });
     return recipe;
    }
    catch(error) {
      console.error(error);
      throw new InternalServerErrorException(error.message)
    }
  }
}
