import { createUnionType, Field, ObjectType } from "type-graphql";
import { Author } from "../type/author.type";

@ObjectType()
export class AuthorsSuccessfulResult {
    @Field(() => [Author])
    authors: Author[];
}

@ObjectType()
export class AuthorsErrorResult {
    @Field()
    message: string;
}

export const AuthorsResult = createUnionType({
    name: "AuthorsResult",
    types: () => [AuthorsErrorResult, AuthorsSuccessfulResult] as const,
    resolveType: value => {
        if("authors" in value){
            return AuthorsSuccessfulResult;
        }
        if("message" in value){
            return AuthorsErrorResult;
        }

        return undefined;
    },
});