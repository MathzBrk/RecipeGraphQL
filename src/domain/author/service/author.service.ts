import { Inject, Service } from "typedi";
import { MyContext } from "../../../context/context";
import { AuthorInput } from "../schema/input/author.input";
import { Author } from "../schema/type/author.type";
import { Recipe } from "../../recipe/schema/type/recipe.type";

@Service()
export class AuthorService{
    constructor(@Inject("context") private context: MyContext){}

    async createAuthor(newAuthorData: AuthorInput): Promise<Author> {
        const {name, recipes, email} = newAuthorData;

        const author: Author = {
            id: this.context.authorDatas.length + 1,
            email,
            name
        }

        const recipesTransformed: Recipe[] = recipes.length > 0 ? recipes.map((recipeInput) => {
            const recipe: Recipe = {
                creationDate: recipeInput.creationDate,
                description: recipeInput.description,
                ingredients: recipeInput.ingredients,
                title: recipeInput.title,
                id: this.context.recipesDatas.length + 1,
                author: author  
            }
            return recipe;
        }) : [];

        author.recipes = recipesTransformed;

        this.context.authorDatas.push(author);
        
        if(author.recipes.length > 0){
            author.recipes.forEach((recipe) => this.context.recipesDatas.push(recipe));
        }

        return author;
    }

    async getAuthors(): Promise<Author[]> {
        return this.context.authorDatas;
    }

}