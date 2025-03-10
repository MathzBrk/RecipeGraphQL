import { Field, ID, ObjectType } from "type-graphql";
import {Author} from "../../author/type/author.type"
import { IsNotEmpty, IsOptional } from "class-validator";

@ObjectType()
export class Recipe {

    @Field(() => ID)
    id: number;

    @Field()
    title: string;

    @Field()
    description: string;

    @Field()
    creationDate: Date;

    @Field(() => [String!]!)
    ingredients: string[];

    @Field(() => Author)
    author: Author;

}