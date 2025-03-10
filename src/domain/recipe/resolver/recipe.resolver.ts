import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { Recipe } from "../type/recipe.type";
import { MyContext } from "../../../context/context";
import { RecipesErrorResult, RecipesResult, RecipesSuccessfulResult } from "../union/recipe-results";
import { RecipeValidationMiddleware } from "../../../middlewares/recipe-middleware.validation";
import { RecipeInput } from "../input/recipe.input";
import { Author } from "../../author/type/author.type";

@Resolver(() => Recipe)
export class RecipeResolver{
    @Query(() => RecipesResult)
    async recipes(@Ctx() context: MyContext): Promise<RecipesSuccessfulResult | RecipesErrorResult>{
        const data = await context.recipesDatas;

        if(!data) {
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
    async createRecipe(@Ctx() context: MyContext, @Arg("input") newRecipeData: RecipeInput): Promise<Recipe>{
        const {title, description, creationDate, ingredients, authorId} = newRecipeData;
        const author: Author = await context.authorDatas.find((author) => author.id === authorId);

        const recipe: Recipe = {
            id: context.recipesDatas.length + 1,
            author: author, 
            creationDate: creationDate,
            description: description, 
            ingredients: ingredients,
            title: title
        }

        if (!recipe) {
            throw new Error("Error creating recipe");
        }

        console.log(recipe);

        context.recipesDatas.push(recipe);

        return recipe;

    }
}