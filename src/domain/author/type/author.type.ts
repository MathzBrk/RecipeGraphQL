import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { Field, ID, ObjectType } from "type-graphql";

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
}