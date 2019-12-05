import {IsEmail, IsOptional, IsString, Length} from "class-validator";

export default class RegisterUserRequestBody {

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

    constructor(firstName: string, lastName: string, email: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }
}
