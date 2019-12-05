import {IsEmail, IsOptional, IsString, Length} from "class-validator";

export default class RegisterUserRequestBody {

    @IsString()
    @Length(4, 64)
    public username: string;

    @IsOptional()
    @IsString()
    @Length(2, 64)
    public firstName?: string;

    @IsString()
    @Length(2, 64)
    public lastName?: string;

    @IsEmail()
    @Length(5, 255)
    public email: string;

    @IsString()
    @Length(4, 32)
    public password: string;

    @IsString()
    @Length(4, 32)
    public repeatedPassword: string;

    constructor(username: string, firstName: string, lastName: string, email: string, password: string, repeatedPassword: string) {
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.repeatedPassword = repeatedPassword;
    }
}
