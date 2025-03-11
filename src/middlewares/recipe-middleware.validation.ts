import { MiddlewareFn } from "type-graphql";
import { MyContext } from "../context/context";
import { GraphQLError } from "graphql";
import { Recipe } from "../domain/recipe/schema/type/recipe.type";

export const RecipeValidationMiddleware: MiddlewareFn<MyContext> = async({args,context}, next) => {
    const {data} = args;
    
    if (!data || !data.ingredients || data.ingredients.length < 3) {
        throw new GraphQLError("A recipe must have at least 3 ingredients");
    }

    const recipe: Recipe = context.recipesDatas.find((recipe) => recipe.title.trim().toLowerCase() === data.title.trim().toLowerCase());

    if(recipe){
        throw new GraphQLError("We already have a recipe with title");
    }
    

    await next();
 
}