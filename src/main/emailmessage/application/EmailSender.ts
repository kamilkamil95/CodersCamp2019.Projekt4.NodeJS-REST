import {CommandResult} from "../../sharedkernel/application/CommandResult";

export interface EmailSender {

    execute(command: SendEmailCommand): CommandResult

}
