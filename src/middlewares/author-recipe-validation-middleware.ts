import { MiddlewareFn } from "type-graphql";
import { MyContext } from "../context/context";
import { GraphQLError } from "graphql";
import { Recipe } from "../domain/recipe/schema/type/recipe.type";

export const AuthorRecipeValidationMiddleware: MiddlewareFn<MyContext> = async({args, context}, next) => {
    const { data } = args;

    if (data.recipes && data.recipes.length > 0) {
        data.recipes.forEach(recipeData => {

            if (!recipeData.ingredients || recipeData.ingredients.length < 3) {
                throw new GraphQLError("A recipe must have at least 3 ingredients");
            }

            const existingRecipe: Recipe = context.recipesDatas.find(
                (recipe) => recipe.title.trim().toLowerCase() === recipeData.title.trim().toLowerCase()
            );

            if (existingRecipe) {
                throw new GraphQLError("We already have a recipe with this title");
            }
        });
    }

    await next();
};
