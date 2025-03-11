import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { AuthorService } from "../../service/author.service";
import { AuthorsErrorResult, AuthorsResult, AuthorsSuccessfulResult } from "../union/author-results";
import { Author } from "../type/author.type";
import { Service } from "typedi";
import { AuthorInput } from "../input/author.input";
import { GraphQLError } from "graphql";
import { RecipeValidationMiddleware } from "../../../../middlewares/recipe-middleware.validation";
import { AuthorRecipeValidationMiddleware } from "../../../../middlewares/author-recipe-validation-middleware";

@Resolver(of => Author)
@Service()
export class AuthorResolver {
    constructor(private readonly authorService: AuthorService){}

    @Query(() => AuthorsResult)
    async authors(): Promise<AuthorsSuccessfulResult | AuthorsErrorResult>{
        const data = await this.authorService.getAuthors();

        if(!data || data.length === 0){
            const error = new AuthorsErrorResult();
            error.message = "No authors found";
            return error;
        }

        const result: AuthorsSuccessfulResult = new AuthorsSuccessfulResult();
        result.authors = data;

        return result;
    }

    @Mutation(() => Author)
    @UseMiddleware([AuthorRecipeValidationMiddleware])
    async createAuthor(@Arg("data") newAuthor: AuthorInput): Promise<Author> {
        const author: Author = await this.authorService.createAuthor(newAuthor);

        if(!author) {
            throw new GraphQLError("Error creating author");
        }

        console.log(author);

        return author;
    }

}