import { GraphQLError } from "graphql/error";
import { RecipeInput } from "../schema/input/recipe.input";
import { Recipe } from "../schema/type/recipe.type";
import { Inject, Service } from "typedi";
import { MyContext } from "../../../context/context";
import { Author } from "../../author/schema/type/author.type";

@Service()
export class RecipeService{

    constructor(@Inject("context") private context: MyContext) {}

    async createRecipe(newRecipeData: RecipeInput): Promise<Recipe>{
        const {title, description, creationDate, ingredients, authorId} = newRecipeData;

        const author: Author = this.context.authorDatas.find((author) => author.id === authorId);

        if(!author){
            throw new GraphQLError("Author not found");
        }

        const recipe: Recipe = {
            id: this.context.recipesDatas.length + 1,
            author: author,
            creationDate: creationDate || new Date(),
            description: description,
            ingredients: ingredients,
            title: title
        };

        this.context.recipesDatas.push(recipe);

        if(!author.recipes) author.recipes = [];
        author.recipes.push(recipe);

        return recipe;
        
    }

    async getRecipes(): Promise<Recipe[]>{
        return this.context.recipesDatas;
    }
}