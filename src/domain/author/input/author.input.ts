import { IsEmail, IsNotEmpty, MaxLength } from "class-validator";
import { InputType } from "type-graphql";

@InputType()
export class AuthorInput{
    
    @IsNotEmpty()
    @MaxLength(30)
    title: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;
}