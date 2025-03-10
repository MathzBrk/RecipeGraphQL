import { ObjectType, Field, createUnionType } from "type-graphql";
import { Recipe } from "../type/recipe.type";

@ObjectType()
export class RecipesSuccessfulResult {
  @Field(() => [Recipe])
  recipes: Recipe[];
}

@ObjectType()
export class RecipesErrorResult {
  @Field()
  message: string;
}

export const RecipesResult = createUnionType({
  name: "RecipesResult",
  types: () => [RecipesSuccessfulResult, RecipesErrorResult] as const,
  resolveType: value => {
    if ("recipes" in value) {
      return RecipesSuccessfulResult;
    }
    if ("message" in value) {
      return RecipesErrorResult;
    }
    return undefined;
  },
});
