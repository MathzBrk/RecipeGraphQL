import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { Recipe } from "../type/recipe.type";
import { MyContext } from "../../../../context/context";
import { RecipesErrorResult, RecipesResult, RecipesSuccessfulResult } from "../union/recipe-results";
import { RecipeValidationMiddleware } from "../../../../middlewares/recipe-middleware.validation";
import { RecipeInput } from "../input/recipe.input";
import { RecipeService } from "../../service/recipe.service";
import { Service } from "typedi";

@Resolver(of => Recipe)
@Service()
export class RecipeResolver{

    constructor(private readonly recipeService: RecipeService) {}

    @Query(() => RecipesResult)
    async recipes(): Promise<RecipesSuccessfulResult | RecipesErrorResult>{
        const data = await this.recipeService.getRecipes();

        if(!data || data.length === 0) {
            const error = new RecipesErrorResult();
            error.message = "No recipes found";
            return error;
        }

        const result = new RecipesSuccessfulResult();
        result.recipes = data;

        return result;
    }

    @Mutation(() => Recipe)
    @UseMiddleware([RecipeValidationMiddleware])
    async createRecipe(@Arg("data") newRecipeData: RecipeInput): Promise<Recipe>{
        const recipe: Recipe = await this.recipeService.createRecipe(newRecipeData);
    
        if (!recipe) {
            throw new Error("Error creating recipe");
        }

        console.log(recipe);


        return recipe;

    }
}