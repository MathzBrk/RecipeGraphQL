import { MiddlewareFn } from "type-graphql";
import { MyContext } from "../context/context";
import { GraphQLError } from "graphql";
import { Author } from "../domain/author/type/author.type";

export const RecipeValidationMiddleware: MiddlewareFn<MyContext> = async({args,context}, next) => {
    if (!args.input || !args.input.ingredients || args.input.ingredients.length < 3) {
        throw new GraphQLError("A recipe must have at least 3 ingredients");
    }

    if(args.input.authorId){
        const author: Author = context.authorDatas.find((author) => author.id === parseInt(args.input.authorId));

        if(!author){
            throw new GraphQLError("Author not found");
        }
    }

    await next();
 
}