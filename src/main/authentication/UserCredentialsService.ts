import {CreateUserCredentials} from "./CreateUserCredentials";
import {CommandResult} from "../sharedkernel/application/CommandResult";

export interface UserCredentialsService {

    execute(command: CreateUserCredentials): Promise<CommandResult>;

}
