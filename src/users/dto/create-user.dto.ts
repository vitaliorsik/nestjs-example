import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsString, Length} from "class-validator";

export class CreateUserDto {
    @ApiProperty({example: 'user@mail.ru', description: 'email address'})
    @IsString({message: 'Must be string'})
    @IsEmail({}, {message: 'Incorrect email'})
    readonly email: string;

    @ApiProperty({example: '12345678', description: 'Password'})
    @IsString({message: 'Must be string'})
    @Length(4, 16, {message: 'Not less 4 and not bigger than 16'})
    readonly password: string;
}
