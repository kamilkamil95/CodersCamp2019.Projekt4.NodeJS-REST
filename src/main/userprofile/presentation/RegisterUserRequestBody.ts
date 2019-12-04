import {IsEmail, IsString, Length} from "class-validator";

export default class RegisterUserRequestBody {

    @IsString()
    @Length(4, 64)
    public username: string;

    @IsEmail()
    @Length(5, 255)
    public email: string;

    @IsString()
    @Length(4, 32)
    public password: string;

    constructor(username: string, email: string, password: string) {
        this.username = username;
        this.email = email;
        this.password = password;
    }
}
