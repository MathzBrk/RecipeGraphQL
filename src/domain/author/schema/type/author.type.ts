import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Field, ID, ObjectType } from "type-graphql";
import { Recipe } from "../../../recipe/schema/type/recipe.type";


@ObjectType()
export class Author{
    
    @Field(() => ID)
    @IsNotEmpty()
    id: number;

    @Field()
    @IsNotEmpty()
    @IsString()
    name: string;

    @Field()
    email: string;

    @Field(() => [Recipe])
    recipes?: Recipe[] = [];
}