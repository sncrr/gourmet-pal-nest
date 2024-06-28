export type CreateRecipePayload = {
  name: string,
  description: string,
  prepTime: number,
  cookTime: number,
  servings: number,
  userId: number,
  privacy: string,

  ingredients: CreateRecipeIngredientPayload[]

  steps: {
    stepNumber: number,
    instruction: string,
  }[]

}

export type CreateRecipeIngredientPayload = {
  ingredientId?: number,
  name?: string,
  unit: string,
  qty: string,
}