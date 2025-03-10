import { Author } from "../domain/author/type/author.type";
import { Recipe } from "../domain/recipe/type/recipe.type";

export interface MyContext {
    recipesDatas: Recipe[];
    authorDatas: Author[]
}