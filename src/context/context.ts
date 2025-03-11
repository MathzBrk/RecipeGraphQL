import { ContainerInstance } from "typedi";
import { Recipe } from "../domain/recipe/schema/type/recipe.type";
import { Author } from "../domain/author/schema/type/author.type";

export interface MyContext {
    recipesDatas: Recipe[];
    authorDatas: Author[];
    requestId: string,
    container: ContainerInstance;
}