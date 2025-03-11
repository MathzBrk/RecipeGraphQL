import { Field, ID, ObjectType } from "type-graphql";

import { IsNotEmpty, IsOptional } from "class-validator";
import { Author } from "../../../author/schema/type/author.type";

@ObjectType()
export class Recipe {

    @Field(() => ID)
    id: number;

    @Field()
    title: string;

    @Field({nullable: true})
    description: string;

    @Field()
    creationDate: Date = new Date();

    @Field(() => [String!]!)
    ingredients: string[];

    @Field(() => Author)
    author: Author;

}