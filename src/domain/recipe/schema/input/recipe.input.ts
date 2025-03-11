import { IsNotEmpty, IsOptional, Max, MaxLength } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class RecipeInput {
    @IsNotEmpty()
    @MaxLength(15)
    @Field()
    title: string;
    
    @IsOptional()
    @MaxLength(25)
    @Field()
    description: string;
    
    @Field({nullable: true})
    @IsOptional()
    creationDate: Date;

    @Field(() => [String!]!)
    ingredients: string[];

    @Field()
    authorId: number;
}