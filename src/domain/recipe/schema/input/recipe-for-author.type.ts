import { IsNotEmpty, MaxLength, IsOptional } from "class-validator";
import { InputType, Field } from "type-graphql";

@InputType()
export class RecipeInputForAuthor {
    @IsNotEmpty()
    @MaxLength(15)
    @Field()
    title: string;
    
    @IsOptional()
    @MaxLength(25)
    @Field({nullable: true})
    description?: string;
    
    @Field({ nullable: true })
    @IsOptional()
    creationDate: Date;

    @Field(() => [String!]!)
    ingredients: string[];
}