import { IsEmail, IsNotEmpty, IsOptional, MaxLength } from "class-validator";
import { Field, InputType } from "type-graphql";
import { Recipe } from "../../../recipe/schema/type/recipe.type";
import { RecipeInput } from "../../../recipe/schema/input/recipe.input";
import { RecipeInputForAuthor } from "../../../recipe/schema/input/recipe-for-author.type";

@InputType()
export class AuthorInput{
    
    @Field()
    @IsNotEmpty()
    @MaxLength(30)
    name: string;
    
    @Field()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @Field(() => [RecipeInputForAuthor])
    @IsOptional()
    recipes?: RecipeInputForAuthor[];
}