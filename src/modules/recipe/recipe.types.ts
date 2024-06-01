export type CreateRecipePayload = {
  name: string,
  description: string,
  prep_time: number,
  cook_time: number,
  servings: number,
  user_id: number,
  privacy: string,

  ingredients: CreateRecipeIngredientPayload[]

  steps: {
    step_number: number,
    instruction: string,
  }[]

}

export type CreateRecipeIngredientPayload = {
  ingredient_id?: number,
  name?: string,
  unit: string,
  qty: string,
}